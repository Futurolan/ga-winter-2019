import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import getConfig from 'next/config'

import ActiveLink from 'components/common/ActiveLink'

import config from 'config/config'

const { publicRuntimeConfig } = getConfig()

function LiveMenu ({ className, data: { loading, error, node } }) {
  if (error) {
    console.log(error)
    return null
  }

  if (node && node.livemode) {
    return <ActiveLink label={config.live.title} className={`ga-live-menu ${className}`} as={config.live.link} path={'/live'} />
  } else { return null }
}

export const edition = gql`
query{
  node:nodeById(id:"${publicRuntimeConfig.EDITION_ID}") {
    ... on NodeEdition {
      livemode:fieldEditionLiveModeActive
    }
  }
}
`

LiveMenu.propTypes = {
  data: PropTypes.object,
  className: PropTypes.string
}

export default graphql(edition)(LiveMenu)
