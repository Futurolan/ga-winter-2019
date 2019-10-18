import React from 'react'

import Layout from 'components/common/Layout'
import NewsList from 'components/news/NewsList'
import Meta from 'components/common/Meta'

import config from 'config/config'

class NewsPage extends React.Component {
  render () {
    return (
      <Layout name='news-page has-bg-star'>
        <div className='section has-bg-star'>
          <Meta title={config.news.title} description={config.news.description} />
          <div className='container'>
            <h1 className='title title-line has-text-centered'><span>Actualités</span></h1>
            <NewsList />
          </div>
        </div>
      </Layout>
    )
  }
}

export default NewsPage
