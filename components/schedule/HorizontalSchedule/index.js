import React from 'react'
import NoSSR from 'react-no-ssr'
import TimelinePlus from 'components/schedule/TimelinePlus'

import './styles.scss'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import moment from 'moment'
import Link from 'next/link'

class HorizontalSchedule extends React.Component {
  constructor (props) {
    super(props)
    this.state = { groups: [], items: [], modal: undefined }
    this.escFunction = this.escFunction.bind(this)
    this.filterDay = this.filterDay.bind(this)
  }

  componentDidMount () {
    document.addEventListener('keydown', this.escFunction, false)

    let minDate
    let maxDate

    let groups = []
    let items = []
    for (let stageIndex in this.props.data) {
      const stage = this.props.data[stageIndex].stage
      groups.push({ content: stage.title, id: stageIndex })
      for (let activityIndex in stage.activities) {
        const activity = stage.activities[activityIndex].activity
        let item = {
          start: moment.utc(activity.date.startDate).toDate(),
          end: moment.utc(activity.date.endDate).toDate(),
          group: stageIndex,
          content: activity.title,
          id: activity.id,
          description: activity.description ? activity.description.processed : '',
          url: activity.url
        }
        if (activity.tournament && activity.tournament.entity && activity.tournament.entity.nid && activity.tournament.entity.title) {
          item.tournamentId = activity.tournament.entity.nid
          item.tournamentTitle = activity.tournament.entity.title
        }
        if (activity.tournament && activity.tournament.entity && activity.tournament.entity.url && activity.tournament.entity.url.path) {
          item.tournamentUrl = activity.tournament.entity.url.path
        }
        if (activity.tournament && activity.tournament.entity && activity.tournament.entity.game && activity.tournament.entity.game.entity && activity.tournament.entity.game.entity.color) {
          item.style = `background-color:${activity.tournament.entity.game.entity.color}`
        }
        items.push(item)

        if (minDate === undefined || minDate.toDate().getTime() > moment.utc(activity.date.startDate).toDate().getTime()) {
          minDate = moment.utc(activity.date.startDate)
        }
        if (maxDate === undefined || maxDate.toDate().getTime() < moment.utc(activity.date.endDate).toDate().getTime()) {
          maxDate = moment.utc(activity.date.endDate)
        }
      }
    }
    this.minDate = minDate.clone()
    this.maxDate = maxDate.clone()

    if (moment().isBetween(this.minDate, this.maxDate)) {
      this.setState({ groups: groups, items: items, currentDate: moment() })
    } else {
      this.setState({ groups: groups, items: items, currentDate: minDate })
    }
  }

  componentWillUnmount () {
    document.removeEventListener('keydown', this.escFunction, false)
  }

  filterDay (date) {
    this.setState({ currentDate: date })
  }

  generateDaysFilter () {
    const minDate = this.minDate
    const maxDate = this.maxDate
    if (minDate && maxDate) {
      const result = []
      const daysCount = maxDate.diff(minDate, 'days')
      const currentDate = this.state.currentDate
      for (let i = 0; i <= daysCount; i++) {
        const filterDate = minDate.clone().add(i, 'days')
        result.push(<div key={i} className='level-item' onClick={(e) => { this.filterDay(filterDate) }}><div className={`button has-background-primary has-text-white ${currentDate && currentDate.date() === filterDate.date() && currentDate.month() === filterDate.month() && currentDate.year() === filterDate.year() ? 'is-active' : ''}`}>{filterDate.format('DD/MM/YYYY')}</div></div>)
      }
      return <div className='filter level'><div className='level-left'>{result}</div></div>
    }
  }
  onItemClick (e) {
    for (let itemIndex in this.state.items) {
      const item = this.state.items[itemIndex]
      if (item.id === e.item) {
        this.setState({ modal: item, currentDate: moment.utc(item.start) })
      }
    }
  }

  escFunction (event) {
    if (event.keyCode === 27) {
      this.closeModal()
    }
  }

  closeModal () {
    this.setState({ modal: undefined })
  }

  render () {
    const { groups, items, modal, currentDate } = this.state

    var options = {
      zoomMin: 1000 * 60 * 60 * 4,
      zoomMax: 1000 * 60 * 60 * 24 * 3,
      hiddenDates: [{ start: '2018-03-31 02:00:00', end: '2018-03-31 09:00:00', repeat: 'daily' }],
      stack: false,
      orientation: 'top',
      margin: 4,
      selectable: false,
      locale: 'fr'
    }

    if (currentDate) {
      options.start = currentDate.startOf('day').toString()
      options.end = currentDate.clone().add(1, 'days').startOf().toString()
    }

    return (
      <div className='ga-horizontal-schedule' >
        {this.generateDaysFilter()}
        <NoSSR onSSR={<span> Chargement du planning en cours !!!</span>}>
          <TimelinePlus options={options} items={items} groups={groups} clickHandler={(e) => this.onItemClick(e)} />
        </NoSSR>
        {modal && <div className='modal is-active'>
          <div className='modal-background' onClick={(e) => this.closeModal()} />
          <div className='modal-content'>
            <div className='card box'>
              <div className='card-header'>
                <div className='is-size-4 has-text-weight-bold'>{modal.content} </div>
              </div>
              <div className='card-content'>
                <div className='has-text-weight-bold has-text-dark-grey'>De <Moment date={modal.start} format='HH:mm' /> à <Moment date={modal.end} format='HH:mm' /></div>
                <div className='content' dangerouslySetInnerHTML={{ __html: modal.description }} />
              </div>
              {(modal.tournamentId || modal.url) && <div className='card-footer'>
                {modal.tournamentId && <Link as={modal.tournamentUrl ? modal.tournamentUrl : `/tournois-single?nid=${modal.tournamentId}`} href={{ pathname: '/tournois-single', query: { nid: modal.tournamentId } }}><a>Plus d'informations sur {modal.tournamentTitle}</a></Link>}
                {modal.tournamentId === undefined && modal.url && <Link href={modal.url}><a>Plus d'informations</a></Link>}
              </div>}
            </div>
          </div>
          <button className='modal-close is-large' aria-label='close' onClick={() => this.closeModal()} />

        </div>}
      </div>
    )
  }
}

HorizontalSchedule.propTypes = {
  data: PropTypes.array
}

export default HorizontalSchedule
