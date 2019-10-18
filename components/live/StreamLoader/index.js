import React from 'react'
import { graphql } from 'react-apollo/index'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import getConfig from 'next/config'

import StreamPlayerList from 'components/live/StreamPlayerList'

const { publicRuntimeConfig } = getConfig()

function StreamLoader ({ data: { loading, error, streamsList } }) {
  if (error) {
    console.log(error)
    return null
  }

  if (streamsList && streamsList.entities && streamsList.entities.length > 0) {
    return <StreamPlayerList streams={streamsList.entities[0].streams} />
  } else { return null }
}

export const edition = gql`
query{
  streamsList:nodeQuery(filter: {conditions: [{field: "type", value: ["streamslist"], operator: EQUAL}, {field: "status", value: ["1"]}, {field: "field_streamslist_edition",value:["${publicRuntimeConfig.EDITION_ID}"]}]}, limit: 1) {
    entities {
     ... on NodeStreamslist{
        streams:fieldStreamslist {
          stream:entity {
            ... on ParagraphStreamTwitch{
              id:fieldStreamId
              name: fieldName
              type {
                id:targetId
              }
            }
            ... on ParagraphStreamYoutube{
              id:fieldStreamId
              name: fieldName
              type {
                id:targetId
              }
            }
          }
        }
      }
    }
  }
}

`

StreamLoader.propTypes = {
  data: PropTypes.object
}

export default graphql(edition)(StreamLoader)
