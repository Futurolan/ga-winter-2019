import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import getConfig from 'next/config'
import Link from 'next/link'

import './styles.scss'

const { publicRuntimeConfig } = getConfig()

function HomeInfo ({
  data: { loading, error, nodeQuery }
}) {
  if (error) {
    return <div className='notification is-danger'>Une erreur est survenue pendant le chargement des bloc d'informations !!!</div>
  }

  if (nodeQuery && nodeQuery.entities && nodeQuery.entities.length > 0) {
    const node = nodeQuery.entities[0]
    return <div className='ga-home-info has-bg-grey-area'>
      <section className='section is-medium'>
        <div className='container'>

          <div className='columns is-variable is-8 is-centered is-multiline'>
            <div className='column is-12-tablet is-one-third-desktop has-text-centered'>
              <div className='box has-background-dark'>
                <h3 className='title has-text-weight-bold has-text-white title-line'><span>{node.title1}</span></h3>
                <div className='content has-text-white' dangerouslySetInnerHTML={{ __html: node.content1.value }} />
                {node.linkText1 && node.link1 && <Link href={node.link1}>
                  <a className='button is-primary is-medium'>{node.linkText1}</a>
                </Link>}
              </div>
            </div>
            <div className='column is-12-tablet  is-one-third-desktop has-text-centered'>
              <div className='box has-background-dark'>
                <h3 className='title has-text-weight-bold has-text-white title-line'><span>{node.title2}</span></h3>
                <div className='content has-text-white' dangerouslySetInnerHTML={{ __html: node.content2.value }} />
                {node.linkText2 && node.link2 && <Link href={node.link2}>
                  <a className='button is-primary is-medium has-text-white'>{node.linkText2}</a>
                </Link>}
              </div>
            </div>
            <div className='column is-12-tablet  is-one-third-desktop has-text-centered'>
              <div className='box has-background-dark'>
                <h3 className='title has-text-weight-bold has-text-white title-line '><span>{node.title3}</span></h3>
                <div className='content has-text-white' dangerouslySetInnerHTML={{ __html: node.content3.value }} />
                {node.linkText3 && node.link3 && <Link href={node.link3}>
                  <a className='button is-primary is-medium has-text-white'>{node.linkText3}</a>
                </Link>}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  }
  return <div className='notification'>Chargement des blocs d'information en cours.</div>
}

export const infos = gql`
{
  nodeQuery(
  filter:{
    conditions:[
      {field:"type",value:["home_info"],operator:EQUAL},
      {field:"field_home_info_edition",value:["${publicRuntimeConfig.EDITION_ID}"]},
      {field:"status",value:["1"]}
    ]},
  sort:[{field:"created",direction:DESC}],
  limit:1) {
    entities {
      ... on NodeHomeInfo{
        title1:fieldHomeInfoTitle1
        content1:fieldHomeInfoContent1{
          value:processed
        }
        linkText1:fieldHomeInfoTextLink1
        link1:fieldHomeInfoLink1
        title2:fieldHomeInfoTitle2
        content2:fieldHomeInfoContent2{
          value:processed
        }
        linkText2:fieldHomeInfoTextLink2
        link2:fieldHomeInfoLink2
        title3:fieldHomeInfoTitle3
        content3:fieldHomeInfoContent3{
          value:processed
        }
        linkText3:fieldHomeInfoTextLink3
        link3:fieldHomeInfoLink3
      }
    }
  }
}
`

HomeInfo.propTypes = {
  data: PropTypes.object
}

export default graphql(infos)(HomeInfo)
