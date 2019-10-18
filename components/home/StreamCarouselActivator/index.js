import React from 'react'
import { graphql } from 'react-apollo/index'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import getConfig from 'next/config'

import StreamCarousel from 'components/home/StreamCarousel'

const { publicRuntimeConfig } = getConfig()

function StreamCarouselActivator ({ data: { loading, error, edition, streamsList } }) {
  if (error) {
    console.log(error)
    return null
  }

  if (edition && edition.livemode && streamsList && streamsList.entities && streamsList.entities.length > 0) {
    return <StreamCarousel streams={streamsList.entities[0].streams} />
  } else { return null }
}

export const edition = gql`
query{
  edition:nodeById(id:"${publicRuntimeConfig.EDITION_ID}") {
    ... on NodeEdition {
      livemode:fieldEditionLiveModeActive
    }
  }
  streamsList:nodeQuery(filter: {conditions: [{field: "type", value: ["streamslist"], operator: EQUAL}, {field: "status", value: ["1"]}, {field: "field_streamslist_edition",value:["${publicRuntimeConfig.EDITION_ID}"]}]}, limit: 1) {
    entities {
     ... on NodeStreamslist{
        streams:fieldStreamslist {
          stream:entity {
            ... on ParagraphStreamTwitch{
              id:fieldStreamId
              front:fieldDisplayFront
              type {
                id:targetId
              }
            }
            ... on ParagraphStreamYoutube{
              id:fieldStreamId
              front:fieldDisplayFront
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

StreamCarouselActivator.propTypes = {
  data: PropTypes.object
}

export default graphql(edition)(StreamCarouselActivator)
