import React from 'react'

import Layout from 'components/common/Layout'
import Meta from 'components/common/Meta'
import FamilyActivitiesList from 'components/family/FamilyActivitiesList'

import config from 'config/config'

class FamilyPage extends React.Component {
  render () {
    return (
      <Layout name='family-page has-bg-star'>
        <section className='section has-bg-star'>
          <Meta title={config.family.title} description={config.family.description} />
          <div className='container'>
            <h1 className='title title-line has-text-centered'><span>{config.family.title}</span></h1>
            <FamilyActivitiesList />
          </div>
        </section>
      </Layout>
    )
  }
}

export default FamilyPage
