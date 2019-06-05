import React from "react";
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import Root from './app.js';
 
if(document.getElementById('root')){
    ReactDOM.render(
        <Router>
            <Root/>
        </Router>
        ,document.getElementById('root')
    );
}
