import React from 'react'
import PropTypes from 'prop-types'

import './styles.scss'

const Hero = (props) => (
  <section className='ga-hero'>
    <div className={`hero is-large has-text-centered`} style={{ background: `url('${props.imgUrl}') no-repeat center center` }}>
      <div className='hero-body'>
        <div className='container'>
          <h1 className='title is-size-1 has-text-white is-uppercase'>{props.title}</h1>
          {props.subtitle && <h2 className='subtitle is-size-2 has-text-white-bis'>{props.subtitle}</h2>}
        </div>
      </div>
    </div>
  </section>
)

Hero.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  imgUrl: PropTypes.string
}

export default Hero
