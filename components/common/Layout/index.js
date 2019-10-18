import React from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'

import * as gtag from 'lib/gtag'

import Header from 'components/common/Header'
import Footer from 'components/common/Footer'

Router.events.on('routeChangeComplete', url => gtag.pageview(url))

const Layout = ({ name, children }) => (
  <div className={`site ${name}`}>
    <Header />
    <main className='site-content'>
      { children }
    </main>
    <Footer />
  </div>
)

Layout.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired
}

export default Layout
