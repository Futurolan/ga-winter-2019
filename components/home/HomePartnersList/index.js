import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import getConfig from 'next/config'
import PartnerCarousel from '../../partners/PartnerCarousel'

const { publicRuntimeConfig } = getConfig()

function HomePartnersList ({ data: { loading, error, nodeQuery } }) {
  if (error) {
    return <div className='notification is-danger'>Une erreur est survenue pendant le chargement des partenaires !!!</div>
  }

  if (nodeQuery && nodeQuery.entities && nodeQuery.entities.length > 0) {
    return <div className='ga-home-partners-list' >
      <section className='section'>
        <h2 className='title title-line has-text-centered is-size-5 is-uppercase'><span >Partenaires</span></h2>
        <PartnerCarousel partners={nodeQuery.entities} />
      </section>
    </div>
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
  limit:9999) {
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
      }
    }
  }
}`

HomePartnersList.propTypes = {
  data: PropTypes.object
}

export default graphql(partners)(HomePartnersList)
