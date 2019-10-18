import React from 'react'

import HorizontalSchedule from 'components/schedule/HorizontalSchedule'
import PropTypes from 'prop-types'
import VerticalSchedule from '../VerticalSchedule'

class ScheduleResponsiveSwitch extends React.Component {
  constructor (props) {
    super(props)
    this.state = { windowWidth: undefined }
  }

  handleResize = () => this.setState({
    windowWidth: window.innerWidth
  })

  componentDidMount () {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  }
  componentWillUnmount () {
    window.removeEventListener('resize', this.handleResize)
  }

  render () {
    return (
      <div className='ga-schedule-responsive-switch'>
        {this.state.windowWidth > 1024 && <HorizontalSchedule data={this.props.data} />}
        {this.state.windowWidth <= 1024 && <VerticalSchedule data={this.props.data} />}
        {this.state.windowWidth === undefined && <div>Chargement en cours</div>}
      </div>
    )
  }
}

ScheduleResponsiveSwitch.propTypes = {
  data: PropTypes.array
}

export default ScheduleResponsiveSwitch
