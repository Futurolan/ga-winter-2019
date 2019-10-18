import React from 'react'

import Layout from 'components/common/Layout'
import TicketContent from 'components/tickets/TicketContent'
import Meta from 'components/common/Meta'

import config from 'config/config'

class BilletteriePage extends React.Component {
  render () {
    return (
      <Layout name='billetterie-page has-bg-star'>
        <section className='section has-bg-star'>
          <Meta title={config.tickets.title} description={config.tickets.description} />
          <div className='container'>
            <TicketContent />
          </div>
        </section>
      </Layout>
    )
  }
}

export default BilletteriePage
