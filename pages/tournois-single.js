import React from 'react'
import PropTypes from 'prop-types'

import Layout from 'components/common/Layout'
import TournamentContent from 'components/tournaments/TournamentContent'

class TournoisSinglePage extends React.Component {
  static getInitialProps ({ query: { nid } }) {
    return { nid: nid }
  }

  constructor (props) {
    super(props)
    // Don't call this.setState() here!
    this.state = { bg: null }
    this._changeBg = this._changeBg.bind(this)
  }

  _changeBg (url) {
    if (url !== this.state.bg) this.setState({ bg: url })
  }
  render () {
    const { nid } = this.props
    let styles = {}
    if (this.state.bg) {
      styles = { background: `url('${this.state.bg}') center top fixed`, backgroundSize: 'cover' }
    }
    return (
      <Layout name='news-single-page has-bg-star'>
        <section className='section has-bg-star' style={styles}>
          <div className='container'>
            <TournamentContent nid={nid} changeBg={this._changeBg} />
          </div>
        </section>
      </Layout>
    )
  }
}

TournoisSinglePage.propTypes = {
  nid: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
}

export default TournoisSinglePage
