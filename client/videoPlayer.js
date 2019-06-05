// import React from 'react';
// import videojs from 'video.js'

// export default class VideoPlayer extends React.Component {
//   componentDidMount() {
//     // instantiate Video.js
//     this.player = videojs(this.videoNode, this.props, function onPlayerReady() {
//       console.log('onPlayerReady', this)
//     });
//   }

//   // destroy player on unmount
//   componentWillUnmount() {
//     if (this.player) {
//       this.player.dispose()
//     }
//   }

//   // wrap the player in a div with a `data-vjs-player` attribute
//   // so videojs won't create additional wrapper in the DOM
//   // see https://github.com/videojs/video.js/pull/3856
//   render() {
//     return (
//       <div>    
//         <div data-vjs-player>
//           <video ref={ node => this.videoNode = node } className="video-js"></video>
//         </div>
//       </div>
//     )
//   }
// }

import React from 'react';
import videojs from 'video.js'
import axios from 'axios';
 
export default class VideoPlayer extends React.Component {
 
    constructor(props) {
        super(props);
 
        this.state = {
            stream: false,
            videoJsOptions: null
        }
    }
 
    componentDidMount() {
 
        axios.get('/user', {
            params: {
                username: this.props.match.params.username
            }
        }).then(res => {
            this.setState({
                stream: true,
                videoJsOptions: {
                    autoplay: false,
                    controls: true,
                    sources: [{
                        // src: 'http://127.0.0.1:' + config.rtmp_server.http.port + '/live/' + res.data.stream_key + '/index.m3u8',
                        src: 'http://127.0.0.1:8888/live/123/index.m3u8',
                        type: 'application/x-mpegURL'
                    }],
                    fluid: true,
                }
            }, () => {
                this.player = videojs(this.videoNode, this.state.videoJsOptions, function onPlayerReady() {
                    console.log('onPlayerReady', this)
                });
            });
        })
    }
 
    componentWillUnmount() {
        if (this.player) {
            this.player.dispose()
        }
    }
 
    render() {
        return (
            <div>
                {this.state.stream ? (
                    <div data-vjs-player>
                        <video ref={node => this.videoNode = node} className="video-js vjs-big-play-centered"/>
                    </div>
                ) : ' Loading ... '}
            </div>
        )
    }
}