import React from 'react'
import PropTypes from 'prop-types'

class TournamentSlotProgress extends React.Component {
  render () {
    const { current, size } = this.props
    const value = current / size
    let color = 'is-success'
    if (value > 0.75) {
      color = 'is-danger'
    } else if (value > 0.5) {
      color = 'is-warning'
    }
    return (
      <div className='ga-tournament-slot-progress'>
        <span className='has-text-weight-light'>Slots : {current}/{size}</span>
        <progress className={`progress ${color} is-small`} value={current} max={size} />
      </div>
    )
  }
}

TournamentSlotProgress.propTypes = {
  size: PropTypes.number,
  current: PropTypes.number
}

export default TournamentSlotProgress
