import React from 'react'

import PropTypes from 'prop-types'

import './styles.scss'
import ToornamentIframe from '../../common/ToornamentIframe'

class ToornamentResults extends React.Component {
  render () {
    const { toornaments } = this.props
    return (<div className='ga-toornament-results'>
      <div className='panel'>
        <div className='panel-heading has-background-primary has-text-white'>
          <i className='fas fa-trophy' />&nbsp;Résultats
        </div>
        <div className='panel-container has-background-white'>
          <div className='columns is-multiline'>
            {toornaments.map((tournament) => (
              <div className='column is-12' key={tournament.nid}>
                <ToornamentIframe id={tournament.toornamentId} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    )
  }
}

ToornamentResults.propTypes = {
  toornaments: PropTypes.array
}

export default ToornamentResults
