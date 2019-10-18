import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'

import TournamentSlotProgress from 'components/tournaments/TournamentSlotProgress'
import Platform from 'components/tournaments/Platform'
import PegiLogo from 'components/tournaments/PegiLogo'

import './styles.scss'

const TournamentCard = (props) => (
  <div className='ga-tournament-card card has-ribbon is-shadowless'>
    <div className='ribbon  is-size-6 has-text-white'><Platform platform={props.platform} /> </div>

    <Link as={props.url ? props.url : `/tournois-single?nid=${props.nid}`} href={{ pathname: '/tournois-single', query: { nid: props.nid } }}>
      <a className='has-text-dark'>
        <div className='card-image'>
          <figure className='image is-2by1'>
            <img
              src={props.imgMobileUrl}
              srcSet={`${props.imgDesktopUrl} 288w, ${props.imgWidescreenUrl} 352w, ${props.imgFullhdUrl} 416w, ${props.imgMobileUrl} 720w`}
              sizes='(min-width: 1408px) 416px,(min-width: 1216px) 352px, (min-width: 769px) 288px,  100vw' />
          </figure>
          <div className='pegi'>
            <PegiLogo pegi={props.pegi} />
          </div>
        </div>
        <div className='card-content '>
          <div className='content has-text-weight-semibold'>
            <h2 className='is-size-5'>{props.title}</h2>
            <TournamentSlotProgress size={props.size} current={props.current} />
          </div>
        </div>
      </a>
    </Link>
  </div>
)

TournamentCard.propTypes = {
  nid: PropTypes.number,
  title: PropTypes.string,
  url: PropTypes.string,
  imgFullhdUrl: PropTypes.string,
  imgWidescreenUrl: PropTypes.string,
  imgDesktopUrl: PropTypes.string,
  imgMobileUrl: PropTypes.string,
  size: PropTypes.number,
  current: PropTypes.number,
  platform: PropTypes.string,
  pegi: PropTypes.string
}

export default TournamentCard
