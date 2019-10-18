import React from 'react'
import PropTypes from 'prop-types'

import './styles.scss'

const FamilyActivity = (props) => (
  <div className='family-activity box has-text-centered'>
    <a href={props.url} target='_blank'>
      <figure>
        <img src={props.imageUrl} alt={`Logo de l'activité ${props.title}`} />
      </figure>
    </a>
  </div>
)

FamilyActivity.propTypes = {
  title: PropTypes.string,
  imageUrl: PropTypes.string,
  url: PropTypes.string
}

export default FamilyActivity
