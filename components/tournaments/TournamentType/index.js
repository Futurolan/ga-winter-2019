import React from 'react'
import PropTypes from 'prop-types'

class TournamentType extends React.Component {
  render () {
    const { type } = this.props
    const map = {
      solo: 'Solo',
      equipe: 'Equipe'
    }

    return (
      <span className='ga-tournament-type' >{map[type] ? map[type] : type}</span>
    )
  }
}

TournamentType.propTypes = {
  type: PropTypes.string
}

export default TournamentType
