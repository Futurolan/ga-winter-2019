import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'

function WeezeventPlayerList ({ size, reservedSlot, data: { loading, error, nodeQuery } }) {
  if (error || (nodeQuery && nodeQuery.entities.length === 1 && nodeQuery.entities[0].type && nodeQuery.entities[0].type.id !== 'weezevent')) {
    return <div className='notification is-danger'>Une erreur est survenue pendant le chargement des inscris !!!</div>
  }
  if (loading) { return <div className='notification'>Chargement des inscrits en cours</div> }

  let dataWeezevent = { type: 'team', data: [] }
  let countWeezevent = 0
  if (nodeQuery && nodeQuery.entities.length === 1) {
    dataWeezevent = JSON.parse(nodeQuery.entities[0].data)
    countWeezevent = nodeQuery.entities[0].count
  }

  return <div className='ga-weezevent-players-list'>

    <div className='panel'>
      <p className='panel-heading has-background-primary has-text-white'>
        <i className='fas fa-headset' />&nbsp;&nbsp;Inscrits {reservedSlot + countWeezevent}/{size}
      </p>
      <table className='table is-fullwidth'>
        <tbody>
          {dataWeezevent.type === 'team' && dataWeezevent.data.map((object, index) => (
            <tr key={index}>
              <td>
                {object.name}
              </td>
              <td>
                {object.players.sort().join(', ')}
              </td>
            </tr>
          ))}
          {dataWeezevent.type === 'solo' && dataWeezevent.data.map((object, index) => (
            <tr key={index}>
              <td>
                {object.team}
              </td>
              <td>
                {(object.pseudo && object.pseudo !== '') ? object.pseudo : <span className='is-size-7 is-italic has-text-grey-light'>Information manquante</span> }
              </td>
            </tr>
          ))}
          {[...Array(reservedSlot)].map((x, index) =>
            <tr key={`reserved${index}`}>
              <td>
                <i className='fas fa-lock' />&nbsp;&nbsp;Slot réservé
              </td>
              <td />
            </tr>
          )}
          {/* {[...Array(size - reservedSlot - countWeezevent > 0 ? size - reservedSlot - countWeezevent : 0)].map((x, index) => */}
          {/* <tr key={`free${index}`}> */}
          {/* <td ><i className='fas fa-lock-open' />&nbsp;&nbsp;Slot libre</td> */}
          {/* <td /> */}
          {/* </tr> */}
          {/* )} */}
        </tbody>
      </table>
    </div>
  </div>
}

export const weezevent = gql`
query weezevent($tournamentNid: String!) {
  nodeQuery(filter: {conditions: [{field: "field_weezevent_tournament", value: [$tournamentNid]}, {field: "type", value: ["weezevent"], operator: EQUAL}, {field: "status", value: ["1"]}]}, limit: 1, sort: {field:"created"}) {
    entities {
      ... on NodeWeezevent{
        data:fieldWeezeventData
        type {
          id:targetId
        }
        count:fieldWeezeventCount
      }
    }
  }
}

`

WeezeventPlayerList.propTypes = {
  data: PropTypes.object,
  size: PropTypes.number,
  reservedSlot: PropTypes.number
}

export default graphql(weezevent, {
  options: ({ tournamentNid }) => ({ variables: { tournamentNid } })
})(WeezeventPlayerList)
