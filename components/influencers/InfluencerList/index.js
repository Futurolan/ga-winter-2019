import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import getConfig from 'next/config'

import InfluencerCard from '../InfluencerCard'

const { publicRuntimeConfig } = getConfig()

function InfluencerList ({ data: { loading, error, nodeQuery } }) {
  if (error) {
    return <div className='notification is-danger'>Une erreur est survenue pendant le chargement !!!</div>
  }

  if (nodeQuery && nodeQuery.entities && nodeQuery.entities.length > 0) {
    return <div className='ga-influencer-list'>
      <div className='columns is-multiline is-6  is-variable'>
        {nodeQuery.entities.map((influencer) => (
          <div className='column is-3-widescreen is-6' key={influencer.nid}>
            <InfluencerCard title={influencer.title} url={influencer.url} description={influencer.description.value} imgMobileUrl={influencer.image.mobile.url} imgDesktopUrl={influencer.image.desktop.url} imgWidescreenUrl={influencer.image.widescreen.url} imgFullhdUrl={influencer.image.fullhd.url} />
          </div>
        ))}
      </div>
    </div>
  }
  return <div className='notification'>Chargement en cours.</div>
}

export const influencers = gql`
{
  nodeQuery(
  filter: {
    conditions: [
      {field: "type", value: ["influencer"], operator: EQUAL},
      {field: "field_influencer_edition", value: ["${publicRuntimeConfig.EDITION_ID}"]},
      {field: "status", value: ["1"]}
    ]
  },
  sort: [{field: "field_influencer_weight", direction: ASC}],
  limit: 9999) {
    entities {
      ... on NodeInfluencer {
        nid
        title
        description:fieldInfluencerDescription{
          value:processed
        }
        url:fieldInfluencerUrl
        image:fieldInfluencerImage{
          mobile:derivative(style:CROP_1_1_705X705){
            url
          }
          desktop:derivative(style:CROP_1_1_200X200){
            url
          }
          widescreen:derivative(style:CROP_1_1_250X250){
            url
          }
          fullhd:derivative(style:CROP_1_1_300X300){
            url
          }
        }
      }
    }
  }
}
`

InfluencerList.propTypes = {
  data: PropTypes.object
}

export default graphql(influencers)(InfluencerList)
