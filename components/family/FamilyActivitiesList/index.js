import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import getConfig from 'next/config'

import FamilyActivity from 'components/family/FamilyActivity'

const { publicRuntimeConfig } = getConfig()

function FamilyActivitiesList ({ data: { loading, error, nodeQuery } }) {
  if (error) {
    return <div className='notification is-danger'>Une erreur est survenue pendant le chargement des activités famille !!!</div>
  }

  if (nodeQuery && nodeQuery.entities && nodeQuery.entities.length > 0 && nodeQuery.entities[0].groups) {
    return <div className='ga-family-activities-list has-text-centered' >
      {nodeQuery.entities[0].groups.map((group) => {
        return <div key={group.entity.id} className='section'>
          <h2 className='title is-size-5 has-text-weight-light is-italic'>{group.entity.name}</h2>

          <div className='columns is-multiline is-vcentered is-centered '>
            {group.entity.activities.map((activity) => {
              return <div key={activity.entity.id} className='column is-2-desktop is-4-tablet'>
                <FamilyActivity title={activity.entity.name} url={activity.entity.url} imageUrl={activity.entity.image.derivative.url} />
              </div>
            })}
          </div>
        </div>
      })}
    </div>
  }
  return <div className='notification'>Chargement des activités famille en cours.</div>
}

export const query = gql`
{
  nodeQuery(
  filter:{
    conditions:[
      {field:"field_family_edition",value:["${publicRuntimeConfig.EDITION_ID}"]},
      {field:"type",value:["family"],operator:EQUAL},
      {field:"status",value:["1"]}
    ]},
  sort:[{field:"created",direction:DESC}],
  limit:1) {
    entities{
      ... on NodeFamily {
        groups: fieldFamilyActivityGroups {
          entity {
            ... on ParagraphFamilyActivityGroup {
              id
              name:fieldFamilyActivityGroupName
              activities:fieldFamilyActivityGroupActi {
                entity {
                  ... on ParagraphFamilyActivity {
                    id
                    name:fieldFamilyActivityTitle
                    image:fieldFamilyActivityImage {
                      derivative(style:FAMILY_150X150){
                        url
                      }
                    }
                    url:fieldFamilyActivityUrl
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}`

FamilyActivitiesList.propTypes = {
  data: PropTypes.object
}

export default graphql(query)(FamilyActivitiesList)
