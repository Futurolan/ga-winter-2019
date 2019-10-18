import React from 'react'

import Layout from 'components/common/Layout'
import PageContent from 'components/page/PageContent'
import PropTypes from 'prop-types'

class Page extends React.Component {
  static getInitialProps ({ query: { nid } }) {
    return { nid: nid }
  }

  render () {
    return (
      <Layout name='page has-bg-star'>
        <div className='section has-bg-star'>
          <div className='container'>
            <PageContent nid={this.props.nid} />
          </div>
        </div>
      </Layout>
    )
  }
}
Page.propTypes = {
  nid: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
}

export default Page
