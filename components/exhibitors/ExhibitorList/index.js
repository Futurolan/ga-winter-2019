import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import getConfig from 'next/config'

import ExhibitorCard from 'components/exhibitors/ExhibitorCard'

const { publicRuntimeConfig } = getConfig()

function ExhibitorList ({ data: { loading, error, nodeQuery } }) {
  if (error) {
    return <div className='notification is-danger'>Une erreur est survenue pendant le chargement des exposants !!!</div>
  }

  if (nodeQuery && nodeQuery.entities && nodeQuery.entities.length > 0) {
    return <div className='ga-exhibitor-list'>
      <div className='columns is-multiline is-6  is-variable'>
        {nodeQuery.entities.map((exhibitor) => (
          <div className='column is-12' key={exhibitor.nid}>
            <ExhibitorCard title={exhibitor.title} description={exhibitor.description.processed} imgUrl={exhibitor.image.derivative.url} localisation={exhibitor.localisation} url={exhibitor.url} />
          </div>
        ))}
      </div>
    </div>
  }
  return <div className='notification'>Chargement des exposants en cours.</div>
}

export const exhibitors = gql`
{
  nodeQuery(
  filter: {
    conditions: [
      {field: "type", value: ["exhibitor"], operator: EQUAL},
      {field: "field_exhibitor_edition", value: ["${publicRuntimeConfig.EDITION_ID}"]},
      {field: "status", value: ["1"]}
    ]
  },
  sort: [{field: "field_exhibitor_weight", direction: ASC}],
  limit: 9999) {
    entities {
      ... on NodeExhibitor {
        nid
        title
        localisation: fieldExhibitorLocalisation
        description: fieldExhibitorDescription {
          processed
        }
        image: fieldExhibitorImage {
          derivative(style: EXHIBITOR_150X150) {
            url
          }
        }
        url: fieldExhibitorUrl
      }
    }
  }
}
`

ExhibitorList.propTypes = {
  data: PropTypes.object
}

export default graphql(exhibitors)(ExhibitorList)
