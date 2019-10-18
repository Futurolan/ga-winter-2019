import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import getConfig from 'next/config'

import ActiveLink from 'components/common/ActiveLink'

import config from 'config/config'

const { publicRuntimeConfig } = getConfig()

function TicketMenu ({ className, data: { loading, error, node } }) {
  if (error) {
    console.log(error)
    return null
  }

  if (node && node.url) {
    return <ActiveLink label={config.tickets.title} className={`ga-ticket-menu ${className}`} as={config.tickets.link} path={'/tickets'} />
  } else { return null }
}

export const edition = gql`
query{
  node:nodeById(id:"${publicRuntimeConfig.EDITION_ID}") {
    ... on NodeEdition {
      url:fieldEditionWeezeventUrl
    }
  }
}
`

TicketMenu.propTypes = {
  data: PropTypes.object,
  className: PropTypes.string
}

export default graphql(edition)(TicketMenu)
