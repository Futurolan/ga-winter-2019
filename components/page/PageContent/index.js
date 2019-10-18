import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import getConfig from 'next/config'

import Meta from 'components/common/Meta'

import './styles.scss'

const { publicRuntimeConfig } = getConfig()

function PageContent ({ data: { loading, error, node } }) {
  if (error) {
    return <div className='notification is-danger'>Une erreur est survenue pendant le chargement de la page !!!</div>
  }

  if (node) {
    // Fix sale tant que j'ai pas compris le soucis de cache ...
    const processedContent = node.content.processed.replace(new RegExp('src="/sites/default/files/inline-images/', 'g'), `src="${publicRuntimeConfig.BACKEND_API_URL}/sites/default/files/inline-images/`)

    return <div className='ga-page-content'>
      <Meta title={node.title} description={node.description} />

      <h1 className='title title-line has-text-centered'><span>{node.title}</span></h1>

      <div className='content has-text-justified' >
        <div dangerouslySetInnerHTML={{ __html: processedContent }} />
      </div>

    </div>
  }
  return <div className='notification'>Chargement de la page en cours</div>
}

export const page = gql`

  query page($nid:String!) {
    node:nodeById(id: $nid) {
      ... on NodePage {
        title
        entityOwner {
          name
        }
        created,
        content:fieldPageContent{
          processed
        }
        description:fieldPageDescription
      }
    }
  }
`

PageContent.propTypes = {
  data: PropTypes.object
}

export default graphql(page, {
  options: ({ nid }) => ({ variables: { nid } })
})(PageContent)
