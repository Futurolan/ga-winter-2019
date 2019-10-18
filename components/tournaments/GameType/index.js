import React from 'react'
import PropTypes from 'prop-types'

class GameType extends React.Component {
  render () {
    const { type } = this.props
    const map = {
      autres: 'Autres',
      battle_royale: 'Battle Royale',
      course: 'Course',
      fps: 'FPS',
      jeu_de_cartes: 'Jeu de cartes',
      moba: 'MOBA',
      rts: 'RTS',
      sport: 'Sport',
      versus_fighting: 'Versus fighting'
    }

    return (
      <span className='ga-game-type' >{map[type] ? map[type] : type}</span>
    )
  }
}

GameType.propTypes = {
  type: PropTypes.string
}

export default GameType
