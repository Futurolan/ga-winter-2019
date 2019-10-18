import React from 'react'

import Layout from 'components/common/Layout'
import Meta from 'components/common/Meta'
import TournamentList from 'components/tournaments/TournamentList'

import config from 'config/config'

class TournoisPage extends React.Component {
  render () {
    return (
      <Layout name='tournois-page has-bg-star'>
        <div className='section has-bg-star'>
          <Meta title={config.tournaments.title} description={config.tournaments.description} />
          <div className='container'>
            <h1 className='title title-line has-text-centered'><span>{config.tournaments.title}</span></h1>
            <TournamentList />
          </div>
        </div>
      </Layout>
    )
  }
}

export default TournoisPage
