import React from 'react'
import Link from 'next/link'
import classNames from 'classnames'

import ActiveLink from 'components/common/ActiveLink'
import TicketMenu from 'components/tickets/TicketMenu'
import LiveMenu from 'components/live/LiveMenu'
import SocialNetworksLinks from 'components/common/SocialNetworksLinks'

import config from 'config/config'
import menu from 'config/menu'

import './styles.scss'

class Header extends React.Component {
  constructor (props) {
    super(props)
    this.state = { isOpen: false }

    this.toggleMenu = this.toggleMenu.bind(this)
  }

  toggleMenu () {
    this.setState({ isOpen: !this.state.isOpen })
  }

  generateDropDown (component, item, index) {
    return <div key={index} className='navbar-item has-dropdown is-hoverable'>
      {component}
      <div className='navbar-dropdown'>
        {item.children.map((item, index) => {
          return this.generateMenuItem(item, index)
        })}
      </div>
    </div>
  }
  generateMenuItem (item, index) {
    if (item.type === undefined) return null

    if (item.type === 'config') {
      if (item.id === undefined) return null

      switch (item.id) {
        case 'live':
          if (item.children) {
            return this.generateDropDown(<LiveMenu className='navbar-link has-text-white is-uppercase has-text-weight-bold' />, item, index)
          } else {
            return <LiveMenu key={index} className='navbar-item has-text-white is-uppercase has-text-weight-bold' />
          }
        case 'tickets':
          if (item.children) {
            return this.generateDropDown(<TicketMenu className='navbar-link has-text-white is-uppercase has-text-weight-bold' />, item, index)
          } else {
            return <TicketMenu key={index} className='navbar-item has-text-white is-uppercase has-text-weight-bold' />
          }
        default:
          if (item.children) {
            return this.generateDropDown(<ActiveLink label={config[item.id].title} className='navbar-link has-text-white is-uppercase has-text-weight-bold' path={`/${item.id}`} as={config[item.id].link} />, item, index)
          } else {
            return <ActiveLink key={index} label={config[item.id].title} className='navbar-item has-text-white is-uppercase has-text-weight-bold' path={`/${item.id}`} as={config[item.id].link} />
          }
      }
    }

    if (item.type === 'nolink') {
      if (item.children) {
        return this.generateDropDown(<div className='navbar-link has-text-white is-uppercase has-text-weight-bold' >{item.title}</div>, item, index)
      } else {
        return <div key={index} className='navbar-item has-text-white is-uppercase has-text-weight-bold' >{item.title}</div>
      }
    }

    if (item.type === 'page') {
      if (item.link === undefined || item.id === undefined || item.title === undefined) return null
      if (item.children) {
        return this.generateDropDown(<ActiveLink label={item.title} className='navbar-link has-text-white is-uppercase has-text-weight-bold' as={item.link} path={{ pathname: '/page', query: { nid: item.id } }} />, item, index)
      } else {
        return <ActiveLink key={index} label={item.title} className='navbar-item has-text-white is-uppercase has-text-weight-bold' as={item.link} path={{ pathname: '/page', query: { nid: item.id } }} />
      }
    }

    if (item.type === 'external') {
      if (item.link === undefined || item.title === undefined) return null
      if (item.children) {
        return this.generateDropDown(<a href={item.link} target='_blank' className='navbar-link has-text-white is-uppercase has-text-weight-bold'>{item.title}</a>, item, index)
      } else {
        return <a key={index} href={item.link} target='_blank' className='navbar-item has-text-white is-uppercase has-text-weight-bold'>{item.title}</a>
      }
    }

    return null
  }
  render () {
    return (
      <header className='ga-header'>
        <nav className='navbar has-background-primary'>
          <div className='navbar-brand'>
            <Link href='/'>
              <a>
                <img alt={`Logo de l'évènement ${config.title}`} src={config.logo} />
              </a>
            </Link>
            <button className='button navbar-burger is-dark' onClick={this.toggleMenu}>
              <span />
              <span />
              <span />
            </button>
          </div>
          <div className={classNames('navbar-menu', 'has-background-primary', 'has-text-centered', { 'is-active': this.state.isOpen })} >
            <div className='navbar-start' />
            {menu.map((item, index) => {
              return this.generateMenuItem(item, index)
            })}

            <div className='navbar-end'>
              {config.mainPartner && <a href={config.mainPartner.url} target='_blank'>
                <img alt={'Logo du partenaire principal de l\'évènement'} src={config.mainPartner.logo} />
              </a>}
              {config.mainPartner === undefined && config.social && <div className='navbar-item'>
                <SocialNetworksLinks />
              </div>}
            </div>
          </div>
        </nav>
      </header>
    )
  }
}

export default Header
