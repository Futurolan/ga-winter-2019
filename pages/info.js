import React from 'react'

import Layout from 'components/common/Layout'
import Meta from 'components/common/Meta'
import InfosContent from 'components/info/InfosContent'

import config from 'config/config'

class InfosPage extends React.Component {
  render () {
    return (
      <Layout name='infos-page has-bg-star'>
        <div className='section has-bg-star'>
          <Meta title={config.info.title} description={config.info.description} />
          <div className='container'>
            <h1 className='title title-line has-text-centered'><span>Informations pratiques</span></h1>
            <InfosContent />
          </div>
        </div>
      </Layout>
    )
  }
}

export default InfosPage
