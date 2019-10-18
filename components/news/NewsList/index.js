import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import getConfig from 'next/config'

import NewsCard from 'components/news/NewsCard'

const { publicRuntimeConfig } = getConfig()

function NewsList ({
  data: { loading, error, nodeQuery }, loadMoreNews
}) {
  if (error) {
    return <div className='notification is-danger'>Une erreur est survenue pendant le chargement des actualités !!!</div>
  }

  if (nodeQuery && nodeQuery.entities && nodeQuery.entities.length > 0) {
    return <div className='ga-news-list'>
      <div className='columns is-multiline is-6  is-variable'>
        {nodeQuery.entities.map((news) => (
          <div className='column is-one-third' key={news.nid}>
            <NewsCard
              nid={news.nid}
              created={news.created}
              title={news.title}
              url={news.url ? news.url.path : null}
              imgMobileUrl={news.image.mobile.url}
              imgDesktopUrl={news.image.desktop.url}
              imgWidescreenUrl={news.image.widescreen.url}
              imgFullhdUrl={news.image.fullhd.url}
            />

          </div>
        ))}
      </div>
      { (nodeQuery.entities.length < nodeQuery.count) && <div className='has-text-centered'>
        <button className='v-button button is-primary' onClick={() => loadMoreNews()}>
          Charger plus d'actualités
        </button>
      </div>}
    </div>
  }
  return <div className='notification'>Chargement des actualités en cours.</div>
}

export const news = gql`
query post($skip:Int!){
  nodeQuery(
  filter:{
    groups: [{
      conjunction: OR,
      conditions: [
        {field: "field_news_editions", operator: IS_NULL},
        {field: "field_news_editions", value: ["${publicRuntimeConfig.EDITION_ID}"]}
      ]
    }],
    conditions:[
      {field:"type",value:["news"],operator:EQUAL},
      {field:"status",value:["1"]}
    ]},
  sort:[{field:"created",direction:DESC}],
  offset: $skip,
  limit:12) {
    count,
    entities {
      ... on NodeNews{
        nid,
        created,
        title,
        url: entityUrl {
          path
        }
        image:fieldNewsImage{
          mobile:derivative(style:CROP_2_1_720X360){
            url
          }
          desktop:derivative(style:CROP_2_1_288X144){
            url
          }
          widescreen:derivative(style:CROP_2_1_352X176){
            url
          }
          fullhd:derivative(style:CROP_2_1_416X208){
            url
          }
        }
      }
    }
  }
}
`

NewsList.propTypes = {
  data: PropTypes.object,
  loadMoreNews: PropTypes.func
}

export const allNewsQueryVars = {
  skip: 0
}

export default graphql(news, {
  options: {
    variables: allNewsQueryVars
  },
  props: ({ data }) => {
    return ({
      data,
      loadMoreNews: () => {
        return data.fetchMore({
          variables: {
            skip: data.nodeQuery.entities.length
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            if (!fetchMoreResult) {
              return previousResult
            }

            return Object.assign({}, previousResult, { nodeQuery: { entities: [...previousResult.nodeQuery.entities, ...fetchMoreResult.nodeQuery.entities], __typename: 'EntityQueryResult' } })
          }
        })
      }
    })
  }
})(NewsList)
