import React from 'react'

import Layout from 'components/common/Layout'
import Meta from 'components/common/Meta'
import PartnerList from 'components/partners/PartnerList'

import config from 'config/config'

class PartenairesPage extends React.Component {
  render () {
    return (
      <Layout name='partenaires-page has-bg-star'>
        <div className='section has-bg-star'>
          <Meta title={config.partners.title} description={config.partners.description} />
          <div className='container has-text-centered'>
            <h1 className='title title-line'><span>Partenaires</span></h1>
            <PartnerList />
          </div>
        </div>
      </Layout>
    )
  }
}

export default PartenairesPage
