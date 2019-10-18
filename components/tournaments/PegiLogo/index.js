import React from 'react'
import PropTypes from 'prop-types'

class PegiLogo extends React.Component {
  render () {
    const { pegi } = this.props
    const map = {
      pegi_3: 'pegi_3.png',
      pegi_7: 'pegi_7.png',
      pegi_12: 'pegi_12.png',
      pegi_16: 'pegi_16.png',
      pegi_18: 'pegi_18.png'
    }

    if (map[pegi]) {
      return (
        <img className='ga-pegi-logo' alt={`Logo PEGI ${pegi}`} src={require(`../../../static/img/pegi/${map[pegi]}`)} />
      )
    } else {
      return null
    }
  }
}

PegiLogo.propTypes = {
  pegi: PropTypes.string
}

export default PegiLogo
