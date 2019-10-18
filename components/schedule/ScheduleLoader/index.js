import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import getConfig from 'next/config'

import ScheduleResponsiveSwitch from '../ScheduleResponsiveSwitch'

const { publicRuntimeConfig } = getConfig()

function ScheduleLoader ({ data: { loading, error, nodeQuery } }) {
  if (error) {
    return <div className='notification is-danger'>Une erreur est survenue pendant le chargement</div>
  }

  if (nodeQuery && nodeQuery.entities && nodeQuery.entities.length === 1) {
    // Parse result in simplier

    return <ScheduleResponsiveSwitch data={nodeQuery.entities[0].stages} />
  }
  return <div className='notification'>Chargement en cours.</div>
}

export const partners = gql`
query{
  nodeQuery(
  filter:{
    conditions:[
      {field: "field_schedule_edition", value: ["${publicRuntimeConfig.EDITION_ID}"]}
      {field:"type",value:["schedule"],operator:EQUAL},
      {field:"status",value:["1"]}
    ]},
  sort:[{field:"created",direction:DESC}],
  limit:1) {
    entities {
      ... on NodeSchedule{
        stages:fieldScheduleActivityGroup{
          stage:entity{
            ... on ParagraphScheduleActivityGroup{
              id
              title:fieldScheduleActivityGroupNa
              activities:fieldScheduleActivityGroupAc{
                activity:entity{
                  ... on ParagraphScheduleActivity{
                    id
                    title:fieldScheduleActivityTitle
                    url:fieldScheduleActivityLink
                    description:fieldScheduleActivityDescript{
                      processed
                    }
                    date:fieldScheduleActivityDate{
                      startDate:value
                      endDate:endValue
                    }
                    tournament:fieldScheduleActivityTourname{
                      entity{
                        ... on NodeTournament{
                          nid
                          title
                           url: entityUrl {
                            path
                          }
                          game:fieldTournamentGame{
                            entity{
                              ... on NodeGame{
                                color:fieldGameColor
                                shortName:fieldGameShortName
                              }
                            }
                          }
                        }
                      }
                    }
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

ScheduleLoader.propTypes = {
  data: PropTypes.object
}

export default graphql(partners)(ScheduleLoader)
