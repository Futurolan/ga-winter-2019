import React from 'react'

import Layout from 'components/common/Layout'
import Meta from 'components/common/Meta'
import ScheduleLoader from 'components/schedule/ScheduleLoader'

import config from 'config/config'

class ProgrammePage extends React.Component {
  render () {
    return (
      <Layout name='planning-page has-bg-star'>
        <div className='section has-bg-star'>
          <Meta title={config.schedule.title} description={config.schedule.description} />
          <h1 className='title title-line has-text-centered'><span>{config.schedule.title}</span></h1>
          <ScheduleLoader />
        </div>
      </Layout>

    )
  }
}

export default ProgrammePage
