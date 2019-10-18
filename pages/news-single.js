import React from 'react'
import PropTypes from 'prop-types'

import Layout from 'components/common/Layout'
import NewsContent from 'components/news/NewsContent'

class NewsSinglePage extends React.Component {
  static getInitialProps ({ query: { nid } }) {
    return { nid: nid }
  }

  render () {
    const { nid } = this.props
    return (
      <Layout name='news-single-page has-bg-star'>
        <section className='section has-bg-star'>
          <div className='container'>
            <NewsContent nid={nid} />
          </div>
        </section>
      </Layout>
    )
  }
}
NewsSinglePage.propTypes = {
  nid: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
}

export default NewsSinglePage
