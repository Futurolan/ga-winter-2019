import React from 'react'
import io from 'socket.io-client'
import getConfig from 'next/config'

import './styles.scss'
import PropTypes from 'prop-types'

const { publicRuntimeConfig } = getConfig()

class StreamList extends React.Component {
  constructor (props) {
    super(props)
    this.state = { socket: null, twitchStreams: {}, youtubeStreams: {} }
  }

  componentDidMount () {
    // connect to WS server and listen event
    const socket = io(publicRuntimeConfig.SOCKET_URL)
    socket.on(`twitchStreams`, (streams) => {
      this.setState({ twitchStreams: streams })
    })
    socket.on(`youtubeStreams`, (streams) => {
      this.setState({ youtubeStreams: streams })
    })
    this.setState({ socket })
  }

  // close socket connection
  componentWillUnmount () {
    this.state.socket.close()
  }

  render () {
    return (
      <div className='ga-stream-list' >
        {Object.keys(this.props.streams).length > 0 && <div className='panel '>

          <div className='panel-heading has-background-primary has-text-white'><i className='fab fa-twitch' />&nbsp;Streams</div>
          <div className='panel-container has-background-white'>
            <div className='columns is-multiline'>

              {Object.keys(this.props.streams).map((i) => {
                const stream = this.props.streams[i].stream

                if ((this.state.twitchStreams[stream.id] && this.state.twitchStreams[stream.id].id && this.state.twitchStreams[stream.id].online) || (this.state.youtubeStreams[stream.id] && this.state.youtubeStreams[stream.id].id && this.state.youtubeStreams[stream.id].online)) {
                  return <div className='thumbnail column is-4-tablet is-4-desktop is-3-widescreen ' key={i}>
                    {stream.type.id === 'stream_twitch' &&
                    <a title={this.state.twitchStreams[stream.id].status} href={`https://www.twitch.tv/${stream.id}`} target='_blank'>
                      <div className='image'>
                        <img alt={`Vignette d'aperçu du live twich de ${this.state.twitchStreams[stream.id].display_name}`} src={`https://static-cdn.jtvnw.net/previews-ttv/live_user_${stream.id}-640x360.jpg?cache=${new Date().getMinutes()}`} />

                        <div className='is-online' />
                        <div className='name has-text-white has-background-dark'> {this.state.twitchStreams[stream.id].display_name}&nbsp;|&nbsp;
                          <i className='fas fa-user' />&nbsp;{this.state.twitchStreams[stream.id].viewer_count}</div>
                        <div className='status has-text-white has-background-dark'>
                          <span>{this.state.twitchStreams[stream.id].status}</span>
                        </div>
                      </div>
                    </a>}
                    {stream.type.id === 'stream_youtube' &&
                    <a title={this.state.youtubeStreams[stream.id].status} href={`https://www.youtube.com/${stream.id}`} target='_blank'>
                      <div className='image'>
                        <img alt={`Vignette d'aperçu du live youtube de ${this.state.youtubeStreams[stream.id].display_name}`} src={`https://i.ytimg.com/vi/${stream.id}/sddefault_live.jpg?cache=${new Date().getMinutes()}`} />

                        <div className='is-online' />
                        <div className='name has-text-white has-background-dark'> {this.state.youtubeStreams[stream.id].display_name}&nbsp;|&nbsp;
                          <i className='fas fa-user' />&nbsp;{this.state.youtubeStreams[stream.id].viewer_count}</div>
                        <div className='status has-text-white has-background-dark'>
                          <span>{this.state.youtubeStreams[stream.id].status}</span>
                        </div>
                      </div>
                    </a>}
                  </div>
                } else return null
              })}
              {Object.keys(this.props.streams).map((i) => {
                const stream = this.props.streams[i].stream

                if ((this.state.twitchStreams[stream.id] && this.state.twitchStreams[stream.id].id && !this.state.twitchStreams[stream.id].online) || (this.state.youtubeStreams[stream.id] && this.state.youtubeStreams[stream.id].id && !this.state.youtubeStreams[stream.id].online)) {
                  return <div className='thumbnail column is-4-tablet is-4-desktop is-3-widescreen ' key={i}>
                    {stream.type.id === 'stream_twitch' && <a href={`https://www.twitch.tv/${stream.id}`} target='_blank'>
                      <div className='image'>
                        <img alt={`Image offline du twitch de ${this.state.twitchStreams[stream.id].display_name}`} src={this.state.twitchStreams[stream.id].offline_image_url} />
                        <div className='is-offline' />
                        <div className='name has-text-white has-background-dark'> {this.state.twitchStreams[stream.id].display_name}</div>
                      </div>
                    </a> }
                    {stream.type.id === 'stream_youtube' && <a href={`https://www.youtube.com/${stream.id}`} target='_blank'>
                      <div className='image'>
                        <img alt={`Image offline du stream de ${this.state.youtubeStreams[stream.id].display_name}`} src={`https://i.ytimg.com/vi/${stream.id}/sddefault_live.jpg`} />
                        <div className='is-offline' />
                        <div className='name has-text-white has-background-dark'> {this.state.youtubeStreams[stream.id].display_name}</div>
                      </div>
                    </a> }

                  </div>
                } else return null
              })}
            </div>
          </div>
        </div>}

      </div>
    )
  }
}

StreamList.propTypes = {
  streams: PropTypes.array
}

export default StreamList
