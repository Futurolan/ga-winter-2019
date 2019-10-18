import React from 'react'

import Layout from 'components/common/Layout'
import Meta from 'components/common/Meta'
import InfluencerList from 'components/influencers/InfluencerList'

import config from 'config/config'

class InfluencersPage extends React.Component {
  render () {
    return (
      <Layout name='influencers-page has-bg-star'>
        <section className='section has-bg-star'>
          <Meta title={config.influencers.title} description={config.influencers.description} />
          <div className='container'>
            <h1 className='title title-line has-text-centered'><span>{config.influencers.title}</span></h1>
            <InfluencerList />
          </div>
        </section>
      </Layout>
    )
  }
}

export default InfluencersPage
