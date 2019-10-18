import React from 'react'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import getConfig from 'next/config'

import PartnerCategories from 'components/partners/PartnerCategories'

const { publicRuntimeConfig } = getConfig()

function PartnerList ({

  partnerCategories: { loading, error, nodeQuery: partnerCategories },
  partners: { loading2, error2, nodeQuery: partners }

}) {
  if (error || error2) {
    return <div className='notification is-danger'>Une erreur est survenue pendant le chargement des partenaires !!!</div>
  }

  if (partnerCategories && partnerCategories.entities && partnerCategories.entities.length > 0 && partners && partners.entities && partners.entities.length > 0) {
    return <div className='ga-partner-list'><PartnerCategories categories={partnerCategories.entities} partners={partners.entities} /></div>
  }

  return <div className='notification'>Chargement des partenaires en cours.</div>
}

export const partners = gql`
{
  nodeQuery(
  filter:{
    conditions:[
      {field:"field_partner_edition",value:["${publicRuntimeConfig.EDITION_ID}"]},
      {field:"type",value:["partner"],operator:EQUAL},
      {field:"status",value:["1"]}
    ]},
  sort:[{field:"field_weight",direction:ASC}],
  limit:999
  ) {
    entities{
      ... on NodePartner{
        title
        nid
        image:fieldPartnerImage{
          derivative(style:PARTNER_150X150){
            url
          }
        }
        url:fieldPartnerUrl
        category:fieldPartnerCategory{
          entity{
            ... on NodePartnerCategory{
              nid
            }
          }
        }
      }
    }
  }
}`

export const partnerCategories = gql`
{
  nodeQuery(
  filter:{
    conditions:[
      {field:"type",value:["partner_category"],operator:EQUAL},
      {field:"status",value:["1"]}
    ]},
  sort:[{field:"field_weight",direction:ASC}],
  ) {
    entities{
      ... on NodePartnerCategory{
        title
        nid
      }
    }
  }
}`

PartnerList.propTypes = {
  partnerCategories: PropTypes.object,
  partners: PropTypes.object
}

export default compose(graphql(partnerCategories, { name: 'partnerCategories' }), graphql(partners, { name: 'partners' }))(PartnerList)
