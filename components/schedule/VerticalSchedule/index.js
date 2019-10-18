import React from 'react'

import PropTypes from 'prop-types'
import Moment from 'react-moment'
import moment from 'moment'
import Link from 'next/link'

import './styles.scss'

class VerticalSchedule extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      showAll: false
    }
    moment.locale('fr')
  }
  generateSchedule () {
    let items = []
    for (let stageIndex in this.props.data) {
      const stage = this.props.data[stageIndex].stage
      for (let activityIndex in stage.activities) {
        let activity = stage.activities[activityIndex].activity
        activity.stage = stage.title
        if (activity.tournament && activity.tournament.entity && activity.tournament.entity.nid && activity.tournament.entity.title) {
          activity.tournamentId = activity.tournament.entity.nid
          activity.tournamentTitle = activity.tournament.entity.title
        }
        if (activity.tournament && activity.tournament.entity && activity.tournament.entity.url && activity.tournament.entity.url.path) {
          activity.tournamentUrl = activity.tournament.entity.url.path
        }
        if (activity.tournament && activity.tournament.entity && activity.tournament.entity.game && activity.tournament.entity.game.entity && activity.tournament.entity.game.entity.color) {
          activity.color = activity.tournament.entity.game.entity.color
        }
        items.push(activity)
      }
    }

    items.sort(function (a, b) {
      return moment.utc(a.date.startDate).diff(moment.utc(b.date.startDate), 'seconds')
    })

    let result = []
    for (let index in items) {
      const item = items[index]

      if (this.state.showAll || moment.utc().diff(moment.utc(item.date.startDate), 'seconds') < 0) {
        result.push(
          <div key={index} className='card box has-ribbon'>
            <div className='ribbon  is-size-6'>{item.stage}</div>

            <div className='card-header'>
              <div className='is-size-4 has-text-weight-bold' style={{ 'color': item.color }}>{item.title}</div>
            </div>
            <div className='card-content'>
              <div className='has-text-weight-bold has-text-dark-grey '><span className='is-capitalized'><Moment date={moment.utc(item.date.startDate).toISOString()} format='dddd' /></span> <Moment date={moment.utc(item.date.startDate).toISOString()} format='DD MMMM' /> de <Moment date={moment.utc(item.date.startDate).toISOString()} format='HH:mm' /> à <Moment date={moment.utc(item.date.endDate).toISOString()} format='HH:mm' /></div>
              {item.description && item.description.processed && <div className='content' dangerouslySetInnerHTML={{ __html: item.description.processed }} />}
            </div>
            {(item.tournamentId || item.url) && <div className='card-footer'>
              {item.tournamentId && <Link as={item.tournamentUrl ? item.tournamentUrl : `/tournois-single?nid=${item.tournamentId}`} href={{ pathname: '/tournois-single', query: { nid: item.tournamentId } }}><a>Plus d'informations sur {item.tournamentTitle}</a></Link>}
              {item.tournamentId === undefined && item.url && <Link href={item.url}><a>Plus d'informations</a></Link>}
            </div>}
          </div>

        )
      }
    }
    return result
  }

  render () {
    return (
      <div className='ga-vertical-schedule' >
        <label className='checkbox'>
          <input type='checkbox' defaultChecked={!this.state.showAll} onClick={() => { this.setState({ showAll: !this.state.showAll }) }} />
          <span className='has-text-weight-bold'> Afficher uniquement les événements à venir</span>
        </label>
        {this.generateSchedule()}
      </div>
    )
  }
}

VerticalSchedule.propTypes = {
  data: PropTypes.array
}

export default VerticalSchedule
