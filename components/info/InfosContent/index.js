import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import getConfig from 'next/config'

import Accordion from 'components/common/Accordion'

const { publicRuntimeConfig } = getConfig()

function InfosContent ({
  data: { loading, error, nodeQuery }
}) {
  if (error) {
    return <div className='notification is-danger'>Une erreur est survenue pendant le chargement des informations !!!</div>
  }

  if (nodeQuery && nodeQuery.entities && nodeQuery.entities.length > 0) {
    const node = nodeQuery.entities[0]
    return <div className='ga-infos-content'>
      <iframe width='100%' height='250' frameBorder='0'
        src={`https://www.google.com/maps/embed/v1/place?q=place_id:${node.placeId}&key=AIzaSyDxn9buXacF0h2mlroZlamJRDIsEIyDxYA`}
        allowFullScreen='' />
      <div className='box content'>
        <div dangerouslySetInnerHTML={{ __html: node.description.value }} />
      </div>

      {node.planning && <Accordion icon='fa-calendar-alt' title='Planning' text={node.planning.value} />}

      {node.pricing && <Accordion icon='fa-euro-sign' title='Tarif' text={node.pricing.value} />}

      {node.access && <Accordion icon='fa-car' title='Accès' text={node.access.value} />}

      {node.accommodation && <Accordion icon='fa-bed' title='Hébergement' text={node.accommodation.value} />}

      {node.equipment && <Accordion icon='fa-headphones' title='Matériel à apporter' text={node.equipment.value} />}

      {node.catering && <Accordion icon='fa-utensils' title='Restauration' text={node.catering.value} />}

    </div>
  }
  return <div className='notification'>Chargement des informations en cours.</div>
}

export const infos = gql`
{
  nodeQuery(
  filter:{
    conditions:[
      {field:"type",value:["information"],operator:EQUAL},
      {field:"field_information_edition",value:["${publicRuntimeConfig.EDITION_ID}"]},
      {field:"status",value:["1"]}
    ]},
  sort:[{field:"created",direction:DESC}],
  limit:1) {
    entities {
      ... on NodeInformation{
        placeId:fieldInformationGmapPlaceId
        description:fieldInformationDescription{
          value:processed
        }
        planning:fieldInformationPlanning{
          value:processed
        }
        pricing:fieldInformationPricing{
          value:processed
        }
        access:fieldInformationAccess{
          value:processed
        }
        accommodation:fieldInformationAccommodation{
          value:processed
        }
        equipment:fieldInformationEquipment{
          value:processed
        }
        catering:fieldInformationCatering{
          value:processed
        }
      }
    }
  }
}
`

InfosContent.propTypes = {
  data: PropTypes.object
}

export default graphql(infos)(InfosContent)
