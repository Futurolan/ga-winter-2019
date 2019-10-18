import React from 'react'
import PropTypes from 'prop-types'

import './styles.scss'

class ToornamentIframe extends React.Component {
  render () {
    if (this.props.id) {
      return <div className='ga-toornament-iframe' dangerouslySetInnerHTML={{ __html: `<iframe width="100%" height="360" src="https://widget.toornament.com/tournaments/${this.props.id}/?_locale=fr_FR&theme=light" frameborder="0" allowfullscreen="true"></iframe>` }} />
    } else { return null }
  }
}

ToornamentIframe.propTypes = {
  id: PropTypes.string
}
export default ToornamentIframe
