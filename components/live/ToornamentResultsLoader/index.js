import React from 'react'
import { graphql } from 'react-apollo/index'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import getConfig from 'next/config'

import ToornamentResults from '../ToornamentResults'

const { publicRuntimeConfig } = getConfig()

function ToornamentResultsLoader ({
  data: { loading, error, nodeQuery }
}) {
  if (error) {
    return <div className='notification is-danger'>Une erreur est survenue pendant le chargement des résultats !!!</div>
  }
  if (loading) {
    return <div className='notification'>Chargement des résultats en cours.</div>
  }

  if (nodeQuery && nodeQuery.entities && nodeQuery.entities.length > 0) {
    return <ToornamentResults toornaments={nodeQuery.entities} />
  }
  return null
}

export const tournaments = gql`
{
  nodeQuery(
  filter:{
    conditions:[
      {field:"type",value:["tournament"],operator:EQUAL},
      {field:"field_tournament_edition",value:["${publicRuntimeConfig.EDITION_ID}"]},
      {field:"field_tournament_toornament_id",operator:IS_NOT_NULL},
      {field:"status",value:["1"]}
    ]},
  sort:[{field:"field_weight",direction:ASC}],
  limit:9999) {
    entities {
      ... on NodeTournament{
        title
        nid
        toornamentId:fieldTournamentToornamentId
      }
    }
  }
}
`

ToornamentResultsLoader.propTypes = {
  data: PropTypes.object
}

export default graphql(tournaments)(ToornamentResultsLoader)
