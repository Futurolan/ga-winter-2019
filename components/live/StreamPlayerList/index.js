import React from 'react'
import io from 'socket.io-client'
import getConfig from 'next/config'

import './styles.scss'
import PropTypes from 'prop-types'
import TwitchPlayer from '../../common/TwitchPlayer'
import YoutubePlayer from '../../common/YoutubePlayer'

const { publicRuntimeConfig } = getConfig()

class StreamPlayerList extends React.Component {
  constructor (props) {
    super(props)
    this.state = { socket: null, twitchStreams: {}, youtubeStreams: {}, currentStream: { id: undefined, type: undefined } }
  }

  componentDidMount () {
    // connect to WS server and listen event
    const socket = io(publicRuntimeConfig.SOCKET_URL)
    socket.on(`twitchStreams`, (streams) => {
      this.setState({ twitchStreams: streams })
      this.selectFirstStream()
    })
    socket.on(`youtubeStreams`, (streams) => {
      this.setState({ youtubeStreams: streams })
      this.selectFirstStream()
    })
    this.setState({ socket })
  }

  selectFirstStream () {
    if (this.state.currentStream.id === undefined && Object.keys(this.state.twitchStreams).length > 0 && Object.keys(this.state.youtubeStreams).length > 0) {
      for (let index in this.props.streams) {
        const stream = this.props.streams[index].stream
        if (this.state.twitchStreams[stream.id] && this.state.twitchStreams[stream.id].online) {
          this.setState({ currentStream: { id: stream.id, type: 'twitch' } })
          break
        }
        if (this.state.youtubeStreams[stream.id] && this.state.youtubeStreams[stream.id].online) {
          this.setState({ currentStream: { id: stream.id, type: 'youtube' } })
          break
        }
      }
    }
  }
  // close socket connection
  componentWillUnmount () {
    this.state.socket.close()
  }

  generatePanelBlock (id, name, viewerCount, type, online) {
    return <div key={id} className={`panel-block ${this.state.currentStream.id === id ? 'is-active' : ''}`} onClick={() => this.setState({ currentStream: { id: id, type: type } })}>
      <span className='panel-icon'>
        {type === 'youtube' && <i className={`fab fa-youtube ${online ? 'has-text-success' : 'has-text-danger'}`} />}
        {type === 'twitch' && <i className={`fab fa-twitch ${online ? 'has-text-success' : 'has-text-danger'}`} />}
      </span>
      <span className='has-text-weight-bold'>
        {name}
      </span>
      <span className='pusher' />
      {viewerCount && <span className='viewer-count'>
        {viewerCount}&nbsp;<i className='fas fa-eye' />
      </span>}
    </div>
  }

  render () {
    const { twitchStreams, youtubeStreams, currentStream } = this.state
    const { streams } = this.props
    if (Object.keys(streams).length === 0) return null
    return (
      <div className='ga-stream-player-list' >
        <div className='columns is-multiline'>
          <div className='column is-12-tablet is-8-desktop' >
            {currentStream.id && currentStream.type === 'twitch' && <TwitchPlayer active channel={currentStream.id} index={0} />}
            {currentStream.id && currentStream.type === 'youtube' && <YoutubePlayer active channel={currentStream.id} index={0} />}

          </div>
          <div className='column is-12-tablet is-4-desktop'>
            <div className='panel has-background-white'>
              {Object.keys(streams).map((index) => {
                const stream = streams[index].stream
                if (stream.type.id === 'stream_twitch' && twitchStreams[stream.id] && twitchStreams[stream.id].id && twitchStreams[stream.id].online) {
                  const typedStream = twitchStreams[stream.id]
                  return this.generatePanelBlock(stream.id, stream.name, typedStream.viewer_count, 'twitch', true)
                } else if (stream.type.id === 'stream_youtube' && youtubeStreams[stream.id] && youtubeStreams[stream.id].id && youtubeStreams[stream.id].online) {
                  const typedStream = youtubeStreams[stream.id]
                  return this.generatePanelBlock(stream.id, stream.name, typedStream.viewer_count, 'youtube', true)
                }
              })}
              {Object.keys(streams).map((index) => {
                const stream = streams[index].stream
                if (stream.type.id === 'stream_twitch' && twitchStreams[stream.id] && twitchStreams[stream.id].id && !twitchStreams[stream.id].online) {
                  const typedStream = twitchStreams[stream.id]
                  return this.generatePanelBlock(stream.id, stream.name, typedStream.viewer_count, 'twitch', false)
                } else if (stream.type.id === 'stream_youtube' && youtubeStreams[stream.id] && youtubeStreams[stream.id].id && !youtubeStreams[stream.id].online) {
                  const typedStream = youtubeStreams[stream.id]
                  return this.generatePanelBlock(stream.id, stream.name, typedStream.viewer_count, 'youtube', false)
                }
              })}

            </div>
          </div>
        </div>
      </div>
    )
  }
}

StreamPlayerList.propTypes = {
  streams: PropTypes.array
}

export default StreamPlayerList
