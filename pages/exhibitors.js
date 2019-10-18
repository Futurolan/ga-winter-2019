import React from 'react'

import Layout from 'components/common/Layout'
import ExhibitorList from 'components/exhibitors/ExhibitorList'
import Meta from 'components/common/Meta'

import config from 'config/config'

class ExhibitorsPage extends React.Component {
  render () {
    return (
      <Layout name='exhibitors-page has-bg-star'>
        <section className='section has-bg-star'>
          <Meta title={config.exhibitors.title} description={config.exhibitors.description} />
          <div className='container'>
            <h1 className='title title-line has-text-centered'><span>{config.exhibitors.title}</span></h1>
            <ExhibitorList />
          </div>
        </section>
      </Layout>
    )
  }
}

export default ExhibitorsPage
