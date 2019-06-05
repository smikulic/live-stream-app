import React from "react";
import {Router, Route} from 'react-router-dom';
import LiveStreams from './liveStreams';
 
import VideoPlayer from './videoPlayer';
const customHistory = require("history").createBrowserHistory();
 
export default class Root extends React.Component {
 
    constructor(props){
        super(props);
    }
 
    render(){
        return (
            <Router history={customHistory} >
                <div>
                    <Route exact path="/" render={props => (
                        <LiveStreams  {...props} />
                    )}/>
 
                    <Route exact path="/stream/:username" render={(props) => (
                        <VideoPlayer {...props}/>
                    )}/>
                </div>
            </Router>
        )
    }
}