import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import getConfig from 'next/config'

import WeezeventIframe from 'components/tickets/WeezeventIframe'

import config from 'config/config'

import './styles.scss'

const { publicRuntimeConfig } = getConfig()

function TicketContent ({ data: { loading, error, node } }) {
  if (error) {
    return <div className='notification is-danger'>Une erreur est survenue pendant le chargement de la billetterie
      !!!</div>
  }

  if (node && node.url && node.weezeventId) {
    return <div className='ga-ticket-content '>
      <h1 className='title title-line has-text-centered'><span>{config.tickets.title}</span></h1>
      <div className='columns is-multiline'>
        <div className='column is-12 is-8-desktop'>
          <div className='box '>
            <WeezeventIframe id={node.weezeventId} url={node.url} />
          </div>
        </div>
        <div className='column is-12 is-4-desktop'>
          {node.url2 && config.tickets.pass && <div className='box content'>
            <h2 className='title is-size-5'>{config.tickets.pass.title}</h2>
            <p>
              {config.tickets.pass.text}
            </p>
            <div className='has-text-centered'>
              <a target='_blank' href={node.url2}><button className='button is-primary is-fullwidth'>{config.tickets.pass.button}</button></a>
            </div>
          </div>}
          {node.minor && config.tickets.minor && <div className='box content'>
            <h2 className='title is-size-5'>{config.tickets.minor.title}</h2>
            <p>
              {config.tickets.minor.text}
            </p>
            <div className='has-text-centered'>
              <a target='_blank' href={node.minor.file.url}><button className='button is-primary is-fullwidth'>{config.tickets.minor.button}</button></a>
            </div>
          </div>}
          {node.rules && config.tickets.rules && <div className='box content'>
            <h2 className='title is-size-5'>{config.tickets.rules.title}</h2>
            <p>
              {config.tickets.rules.text}
            </p>
            <div className='has-text-centered'>
              <a target='_blank' href={node.rules.file.url}><button className='button is-primary is-fullwidth'>{config.tickets.rules.button}</button></a>
            </div>
          </div>}
        </div>
      </div>
    </div>
  }
  return <div className='notification'>Chargement de la billetterie en cours.</div>
}

export const edition = gql`
query{
  node:nodeById(id:"${publicRuntimeConfig.EDITION_ID}") {
    ... on NodeEdition {
      url:fieldEditionWeezeventUrl
      url2:fieldEditionWeezeventUrl2
      weezeventId:fieldEditionWeezeventEventId
      rules:fieldEditionRules{
        file:entity{
          url
        }
      }
      minor:fieldEditionMinorsRules{
        file:entity{
          url
        }
      }
    }
  }
}
`

TicketContent.propTypes = {
  data: PropTypes.object
}

export default graphql(edition)(TicketContent)
