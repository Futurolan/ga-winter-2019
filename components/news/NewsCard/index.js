import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import Link from 'next/link'

import './styles.scss'

const NewsCard = (props) => (
  <div className='ga-news-card card has-ribbon is-shadowless'>
    <div className='ribbon  is-size-7'><Moment unix format='DD/MM/YYYY'>{props.created}</Moment></div>
    <Link as={props.url ? props.url : `/news-single?nid=${props.nid}`} href={{ pathname: '/news-single', query: { nid: props.nid } }}>
      <a className='has-text-dark'>
        <div className='card-image'>
          <figure className='image is-2by1'>
            <img
              src={props.imgMobileUrl}
              srcSet={`${props.imgDesktopUrl} 288w, ${props.imgWidescreenUrl} 352w, ${props.imgFullhdUrl} 416w, ${props.imgMobileUrl} 720w`}
              sizes='(min-width: 1408px) 416px,(min-width: 1216px) 352px, (min-width: 769px) 288px,  100vw' />
          </figure>
        </div>
        <div className='card-content '>
          <div className='content has-text-weight-semibold'>
            {props.title}
          </div>
        </div>
      </a>
    </Link>
  </div>
)

NewsCard.propTypes = {
  nid: PropTypes.number,
  title: PropTypes.string,
  url: PropTypes.string,
  imgFullhdUrl: PropTypes.string,
  imgWidescreenUrl: PropTypes.string,
  imgDesktopUrl: PropTypes.string,
  imgMobileUrl: PropTypes.string,
  created: PropTypes.number
}

export default NewsCard
