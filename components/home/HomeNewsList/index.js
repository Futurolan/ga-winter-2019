import React from 'react'
import { graphql } from 'react-apollo'
import Link from 'next/link'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import { Timeline } from 'react-twitter-widgets'
import getConfig from 'next/config'

import NewsCard from 'components/news/NewsCard'

import config from 'config/config'

const { publicRuntimeConfig } = getConfig()

function HomeNewsList ({
  data: { loading, error, nodeQuery }
}) {
  if (error) {
    return <div className='ga-home-news-list has-bg-star'>
      <section className='section'>
        <div className='container'>
          <div className='notification is-danger'>Une erreur est survenue pendant le chargement des actualités !!!</div>
        </div>
      </section>
    </div>
  }

  if (nodeQuery && nodeQuery.entities && nodeQuery.entities.length) {
    return <div className='ga-home-news-list has-bg-star'>
      <section className='section'>
        <div className='container'>

          <div className='columns is-multiline is-8 is-variable'>
            <div className='column is-7-desktop is-12-tablet'>
              <h2 className='title title-line has-text-centered is-size-5 is-uppercase'><span >Actualités</span></h2>
              <div className='is-multiline columns is-6 is-variable news-list'>
                {nodeQuery.entities.map((news) => (
                  <div className='column is-6-desktop is-12' key={news.nid}>
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
              <Link href={config.news.link} ><a className='button is-primary is-medium' >Voir plus d'actualités</a></Link>
            </div>
            <div className='column is-5-desktop is-12-tablet'>
              <h2 className='title title-line has-text-centered is-size-5 is-uppercase'><span>Twitter</span></h2>
              <Timeline
                dataSource={{
                  sourceType: 'profile',
                  screenName: config.home.twitterAccount,
                  noHeader: true
                }}
                options={{
                  height: '600',
                  chrome: 'noheader nofooter noborders '
                }} />
            </div>
          </div>
        </div>
      </section>
    </div>
  }
  return <div className='ga-home-news-list has-bg-star'>
    <section className='section'>
      <div className='container'>
        <div className='notification'>Chargement des actualités en cours</div>
      </div>
    </section>
  </div>
}

export const news = gql`
{
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
  limit:4) {
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
HomeNewsList.propTypes = {
  data: PropTypes.object
}

export default graphql(news)(HomeNewsList)
