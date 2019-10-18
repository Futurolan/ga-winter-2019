import React from 'react'
import PropTypes from 'prop-types'

import './styles.scss'

const InfluencerCard = (props) => (
  <div className='box influencer-card'>
    <a href={props.url}>
      <figure className='image'>
        <img className='is-1by1' alt={`Image de ${props.title}`} src={props.imgMobileUrl} srcSet={`${props.imgDesktopUrl} 200w, ${props.imgWidescreenUrl} 250w, ${props.imgFullhdUrl} 300w, ${props.imgMobileUrl} 705w`} sizes='(min-width: 768px) 20vw, (min-width: 1088px) 50vw, 100vw' />
      </figure>
      <h2 className='title is-size-4 is-marginless'>
        {props.title}
      </h2>
      <div className='content has-text-black' dangerouslySetInnerHTML={{ __html: props.description }} />
    </a>
  </div>
)

InfluencerCard.propTypes = {
  title: PropTypes.string,
  url: PropTypes.string,
  imgFullhdUrl: PropTypes.string,
  imgWidescreenUrl: PropTypes.string,
  imgDesktopUrl: PropTypes.string,
  imgMobileUrl: PropTypes.string,
  description: PropTypes.string
}

export default InfluencerCard
