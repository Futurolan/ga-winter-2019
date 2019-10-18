import React from 'react'
import Head from 'next/head'
import { withRouter } from 'next/router'
import PropTypes from 'prop-types'
import getConfig from 'next/config'

import config from 'config/config'

const { publicRuntimeConfig } = getConfig()

const Meta = (props) => {
  const title = props.title ? `${props.title} | ${config.title}` : config.title
  const description = props.description ? props.description : config.description
  const image = props.image ? props.image : `${publicRuntimeConfig.BASE_URL}${config.metaImagePath}`
  return (
    <Head>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='image' content={image} />
      <meta itemProp='name' content={title} />
      <meta itemProp='description' content={description} />
      <meta itemProp='image' content={image} />
      <meta name='twitter:card' content='summary' />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:image' content={image} />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:image' content={image} />
      <meta property='og:url' content={`${publicRuntimeConfig.BASE_URL}${props.router.asPath}`} />
      <meta property='og:site_name' content={title} />
      <meta property='og:locale' content='fr_FR' />
      <meta property='og:type' content='website' />
    </Head>
  )
}

Meta.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  router: PropTypes.object
}

export default withRouter(Meta)
