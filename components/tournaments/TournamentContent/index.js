import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import getConfig from 'next/config'

import PegiLogo from 'components/tournaments/PegiLogo'
import GameType from 'components/tournaments/GameType'
import TournamentType from 'components/tournaments/TournamentType'
import Platform from 'components/tournaments/Platform'
import Meta from 'components/common/Meta'
import WeezeventPlayerList from 'components/tickets/WeezeventPlayersList'
import TicketButton from 'components/tickets/TicketButton'
import ToornamentIframe from 'components/common/ToornamentIframe'

import './styles.scss'

const { publicRuntimeConfig } = getConfig()

function TournamentContent ({ changeBg, data: { loading, error, node } }) {
  if (error || (node && node.type.id !== 'tournament') || (node && node.edition.nid !== parseInt(publicRuntimeConfig.EDITION_ID))) {
    return <div className='notification is-danger'>Une erreur est survenue pendant le chargement du tournoi !!!</div>
  }

  if (node) {
    if (node.bgSponsor) {
      changeBg(node.bgSponsor.url)
    }
    return <div className='ga-tournament-content'>
      <Meta title={node.title} image={node.image ? node.image.fullhd.url : node.game.node.image.fullhd.url} description={`Toutes les informations relatives au tournoi ${node.title}`} />

      <h1 className='title title-line has-text-centered'><span>{node.title}</span></h1>
      <div className='ga-tournament-content-image'>
        <figure className='image is-5by1'>
          <img alt={`Image du tournoi ${node.title}`} src={node.image ? node.image.mobile.url : node.game.node.image.mobile.url} srcSet={`${node.image ? node.image.mobile.url : node.game.node.image.mobile.url} 705w, ${node.image ? node.image.desktop.url : node.game.node.image.desktop.url} 960w, ${node.image ? node.image.widescreen.url : node.game.node.image.widescreen.url} 1155w, ${node.image ? node.image.fullhd.url : node.game.node.image.fullhd.url} 1345w`} />
        </figure>
        <div className='pegi'>
          <PegiLogo pegi={node.game.node.pegi} />
        </div>
      </div>
      <div className='tags'>
        <span className='tag is-dark'>{node.game.node.editor}</span>
        <span className='tag is-dark'><GameType type={node.game.node.type} /></span>
        <span className='tag is-dark'><TournamentType type={node.tournamentType} /></span>
        <span className='tag is-dark'><Platform platform={node.platform} /></span>
      </div>

      <div className='columns'>
        <div className='column is-8'>
          <div className='box content' >
            <div dangerouslySetInnerHTML={{ __html: node.description.value }} />
          </div>

          <ToornamentIframe id={node.toornamentId} />

          <div className='panel'>
            <p className='panel-heading has-background-primary has-text-white'>
              <i className='fas fa-calendar-alt' />&nbsp;&nbsp;Planning
            </p>
            <div className='panel-block has-background-white'>
              <div className='content' dangerouslySetInnerHTML={{ __html: node.planning.value }} />
            </div>
          </div>
          <WeezeventPlayerList tournamentNid={node.nid.toString()} reservedSlot={node.reservedSlot} size={node.size} />
        </div>
        <div className='column is-4'>
          <TicketButton />
          <div className='panel'>
            <p className='panel-heading has-background-primary has-text-white'>
              <i className='fas fa-ruler' />&nbsp;&nbsp;Format
            </p>
            <div className='panel-block has-background-white'>
              <div dangerouslySetInnerHTML={{ __html: node.format }} />
            </div>
          </div>
          {node.cashPrizeTitle && node.cashPrizeLines.length > 0 &&
          <div className='panel'>
            <p className='panel-heading has-background-primary has-text-white'>
              <i className='fas fa-money-check' />&nbsp;&nbsp;{node.cashPrizeTitle}
            </p>
            <table className='table is-fullwidth'>
              <tbody>
                {node.cashPrizeLines.map((cashPrizeLine, index) => (
                  <tr key={index}>
                    <td>
                      {cashPrizeLine}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>}
          {node.rules.length > 0 &&
          <div className='panel'>
            <p className='panel-heading has-background-primary has-text-white'>
              <i className='fas fa-file-pdf' />&nbsp;&nbsp;Règlement
            </p>
            <table className='table is-fullwidth'>
              <tbody>
                {node.rules.map((rule, index) => (
                  <tr key={index}>
                    <td>
                      <a href={rule.entity.url} target='_blank'><i className='fas fa-download' />&nbsp;&nbsp;{rule.description}</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>}
        </div>
      </div>

    </div>
  }
  return <div className='notification'>Chargement du tournoi en cours</div>
}

export const tournament = gql`

  query tournament($nid:String!) {
    node:nodeById(id: $nid) {
      type {
        id:targetId
      }
      ... on NodeTournament {
        title
        nid
        tournamentType:fieldTournamentType
        platform:fieldTournamentPlatform
        format:fieldTournamentFormat
        cashPrizeTitle:fieldTournamentCashprizeTitle
        cashPrizeLines:fieldTournamentCashprizeLines
        description:fieldTournamentDescription{
          value:processed
        }
        planning:fieldTournamentPlanning{
          value:processed
        }
        rules:fieldTournamentRules{
          description
          entity{
            ... on File{
              url
            }
          }
        }
        image:fieldTournamentImage{
          mobile:derivative(style:CROP_5_1_705X141){
            url
          }
          desktop:derivative(style:CROP_5_1_960X192){
            url
          }
          widescreen:derivative(style:CROP_5_1_1155X231){
            url
          }
          fullhd:derivative(style:CROP_5_1_1345X269){
            url
          }
        }
        game:fieldTournamentGame{
          node:entity{
            ...on NodeGame{
              pegi:fieldGamePegi
              editor:fieldGameEditor
              type:fieldGameType
              image:fieldGameImage{
                mobile:derivative(style:CROP_5_1_705X141){
                  url
                }
                desktop:derivative(style:CROP_5_1_960X192){
                  url
                }
                widescreen:derivative(style:CROP_5_1_1155X231){
                  url
                }
                fullhd:derivative(style:CROP_5_1_1345X269){
                  url
                }
              }
            }
          }
        }
        edition:fieldTournamentEdition{
          nid:targetId
        }
        reservedSlot:fieldTournamentReservedSlot
        size:fieldTournamentSize
        toornamentId:fieldTournamentToornamentId
        bgSponsor: fieldTournamentBgSponsor{
          url
        }
      }
    }
  }

`

TournamentContent.propTypes = {
  data: PropTypes.object,
  changeBg: PropTypes.func
}

export default graphql(tournament, {
  options: ({ nid }) => ({ variables: { nid } })
})(TournamentContent)
