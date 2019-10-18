import React from 'react'
import PropTypes from 'prop-types'

import './styles.scss'

const PartnerLogo = (props) => (
  <div className='partner-logo box has-text-centered'>
    <a href={props.url} target='_blank'>
      <figure>
        <img src={props.imageUrl} alt={`Logo du partenaire ${props.title}`} />
      </figure>
    </a>
  </div>
)

PartnerLogo.propTypes = {
  title: PropTypes.string,
  imageUrl: PropTypes.string,
  url: PropTypes.string
}

export default PartnerLogo
