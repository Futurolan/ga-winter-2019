import React from 'react'

import ActiveLink from 'components/common/ActiveLink'
import SocialNetworksLinks from 'components/common/SocialNetworksLinks'

import config from 'config/config'

import './styles.scss'

class Footer extends React.Component {
  render () {
    return (
      <footer className='footer ga-footer has-background-dark has-text-white'>
        <div className='container'>
          <div className='content ga-footer-links has-text-centered'>
            {config.contact.active && <ActiveLink className='has-text-white' label='Contacts' path='/contacts' />}
            {config.press.active && <ActiveLink className='has-text-white' label='Accreditation Presse' path='/espace-presse' />}
            {config.legals.active && <ActiveLink className='has-text-white' label='Mentions Légales ' path='/mentions-legales' />}
            {config.recruit.active && <ActiveLink className='has-text-white' label='Recrutement' path='/recrutement' />}
          </div>
          <SocialNetworksLinks />
        </div>
      </footer>
    )
  }
}

export default Footer
