import React from 'react'
import ErrorPage from 'next/error'

import Layout from 'components/common/Layout'
import PageContent from 'components/page/PageContent'

import config from 'config/config'

class ContactsPage extends React.Component {
  render () {
    if (config.legals.active !== true) {
      return <ErrorPage statusCode={404} />
    }

    return (
      <Layout name='mentions-legales-page has-bg-star'>
        <div className='section has-bg-star'>
          <div className='container'>
            <PageContent nid={config.legals.pageId.toString()} />
          </div>
        </div>
      </Layout>
    )
  }
}

export default ContactsPage
