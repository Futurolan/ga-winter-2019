import React from 'react'

import Layout from 'components/common/Layout'
import HomeNewsList from 'components/home/HomeNewsList'
import HomeInfoBlocks from 'components/home/HomeInfo/index'
import Meta from 'components/common/Meta'
import Banner from 'components/home/Banner'
import Hero from 'components/home/Hero'
import StreamCarouselActivator from 'components/home/StreamCarouselActivator'
import HomePartnersList from 'components/home/HomePartnersList'

import config from 'config/config'

class HomePage extends React.Component {
  render () {
    return (
      <Layout name='home-page'>
        <div>
          <Meta title='Accueil' />
          {config.home.hero && <Hero title={config.home.hero.title} subtitle={config.home.hero.subtitle} imgUrl={config.home.hero.background} />}
          {config.home.banner && <Banner imgUrl={config.home.banner} />}
          <StreamCarouselActivator />
          <HomeInfoBlocks />
          <HomeNewsList />
          {config.home.partners && config.home.partners.active && <HomePartnersList />}
        </div>
      </Layout>
    )
  }
}

export default HomePage
