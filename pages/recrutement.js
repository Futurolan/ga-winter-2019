import React from 'react'
import ErrorPage from 'next/error'

import Layout from 'components/common/Layout'
import Meta from 'components/common/Meta'

import config from 'config/config'

class RecrutementPage extends React.Component {
  render () {
    if (config.recruit.active !== true) {
      return <ErrorPage statusCode={404} />
    }

    return (
      <Layout name='recrutement-page has-bg-star'>
        <div className='section has-bg-star'>
          <Meta title={config.recruit.title} description={config.recruit.description} />
          <div className='container has-text-centered'>
            <div className='content'>
              <p>
                <a className='button is-primary' target='_blank' href={config.recruit.formUrl}>Voir le formulaire dans un nouvel onglet</a>
              </p>
              <iframe frameBorder='0' height='1750' src={config.recruit.formUrl} width='100%'>Chargement en cours...</iframe>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default RecrutementPage
