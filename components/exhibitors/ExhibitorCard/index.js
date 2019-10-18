import React from 'react'
import PropTypes from 'prop-types'

import './styles.scss'

const ExhibitorCard = (props) => (
  <div className='box exhibitor-card'>
    <div className='columns'>
      <div className='column is-3 is-3-tablet'>
        <div className='has-text-centered'>
          <img src={props.imgUrl} />
          <a className='button is-primary is-fullwidth' href={props.url}>Site web</a>
        </div>
      </div>
      <div className='column is-9'>
        <div className='description'>
          <h2 className='title is-5 is-marginless'>{props.title}</h2>
          <div className='has-text-grey is-italic'><i className='fas fa-map-marker-alt' /> {props.localisation}</div>
          <div className='content'>
            <div dangerouslySetInnerHTML={{ __html: props.description }} />
          </div>
        </div>
      </div>
    </div>
  </div>
)

ExhibitorCard.propTypes = {
  title: PropTypes.string,
  url: PropTypes.string,
  imgUrl: PropTypes.string,
  localisation: PropTypes.string,
  description: PropTypes.string
}

export default ExhibitorCard
