import React from 'react'
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRedirect } from 'react-router';
import DashBoard from '../components/dashboard/DashBoard';
import Ankur from '../components/ankur/Ankur'
import App from '../components/app/App';
require("bootstrap/dist/css/bootstrap.css");
window.jQuery = window.$ =  require('jquery/dist/jquery.min');
require("bootstrap/dist/js/bootstrap.js");


ReactDOM.render((
  <Router history={ hashHistory }>
    <Route path="/" component={App}>
      <IndexRedirect to ="/dashboard"/>
      <Route path="dashboard" component={DashBoard}/>
    </Route>
  </Router>
), document.getElementById('app-container'))
