import React from 'react'
import Link from 'next/link'
import io from 'socket.io-client'
import getConfig from 'next/config'
import PropTypes from 'prop-types'

import TwitchPlayer from 'components/common/TwitchPlayer'
import YoutubePlayer from 'components/common/YoutubePlayer'

import config from 'config/config'

import './styles.scss'

const { publicRuntimeConfig } = getConfig()

class StreamCarousel extends React.Component {
  constructor (props) {
    super(props)
    this.state = { socket: null, current: -3, items: [], channelList: [], streamsOnline: {} }
    this.twitchStreams = undefined
    this.youtubeStreams = undefined
    this.buildList = this.buildList.bind(this)
    this.handleNextClick = this.handleNextClick.bind(this)
    this.handlePreviousClick = this.handlePreviousClick.bind(this)
    this.handleItemClick = this.handleItemClick.bind(this)
  }

  refreshChannelList () {
    if (this.twitchStreams && this.youtubeStreams) {
      let streamsOnline = {}
      for (let streamId in this.props.streams) {
        const stream = this.props.streams[streamId].stream
        if (stream.front && stream.type.id === 'stream_twitch' && this.twitchStreams[stream.id].online) {
          streamsOnline[stream.id] = stream.type.id
        }

        if (stream.front && stream.type.id === 'stream_youtube' && this.youtubeStreams[stream.id].online) {
          streamsOnline[stream.id] = stream.type.id
        }

        const channelList = Object.keys(streamsOnline)
        if (channelList.length > 0) {
          this.setState({ channelList: channelList, streamsOnline: streamsOnline })
          this.state.socket.close()
        }
      }
    }
  }

  componentDidMount () {
    // connect to WS server and listen event
    const socket = io(publicRuntimeConfig.SOCKET_URL)

    socket.on(`twitchStreams`, (streams) => {
      this.twitchStreams = streams
      this.refreshChannelList()
    })
    socket.on(`youtubeStreams`, (streams) => {
      this.youtubeStreams = streams
      this.refreshChannelList()
    })
    this.setState({ socket })
  }

  // close socket connection
  componentWillUnmount () {
    this.state.socket.close()
  }

  buildList () {
    let channelList = []
    for (let i = 0; i < 7; i++) {
      if (this.state.current >= 0) {
        channelList.push(this.state.channelList[(i + this.state.current) % this.state.channelList.length])
      } else {
        channelList.push(this.state.channelList[(this.state.channelList.length + (this.state.current % this.state.channelList.length) + i) % this.state.channelList.length])
      }
    }
    return channelList.map((channel, index) => {
      return <div onClick={this.handleItemClick} key={`item-${index + this.state.current}`} className={`ga-stream-carousel-player-item item-${index}`}>

        {this.state.streamsOnline[channel] === 'stream_twitch' && <TwitchPlayer active={index === 3} index={index} img={`https://static-cdn.jtvnw.net/previews-ttv/live_user_${channel}-640x360.jpg`} channel={channel} />}
        {this.state.streamsOnline[channel] === 'stream_youtube' && <YoutubePlayer active={index === 3} index={index} img={`https://i.ytimg.com/vi/${channel}/sddefault_live.jpg`} channel={channel} />}
      </div>
    })
  }

  handleNextClick () {
    this.setState({ current: this.state.current + 1 })
  }
  handlePreviousClick () {
    this.setState({ current: this.state.current - 1 })
  }

  handleItemClick (e) {
    const current = this.state.current + (e.target.getAttribute('data-index') - 3)

    this.setState({ current: current })
  }
  render () {
    if (this.state.channelList.length > 0) {
      return <div className='ga-stream-carousel'>
        <div className={`ga-stream-carousel-content ${this.state.channelList.length < 5 ? 'is-single' : ''}`}>
          {this.buildList()}
          {this.state.channelList.length >= 2 && <div className='next' onClick={this.handleNextClick}><i className='fas fa-angle-right' /></div>}
          {this.state.channelList.length >= 2 && <div className='previous' onClick={this.handlePreviousClick}><i className='fas fa-angle-left' /></div>}
        </div>
        <div className='ga-stream-carousel-button has-text-centered'>
          <Link href={config.live.link}>
            <a className='button is-primary is-medium'>
              Voir la page live
            </a>
          </Link>
        </div>
      </div>
    } else {
      return null
    }
  }
}

StreamCarousel.propTypes = {
  streams: PropTypes.array
}

export default StreamCarousel
