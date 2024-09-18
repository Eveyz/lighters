import 'es6-shim';

import React from 'react';
import ReactDOM from 'react-dom';

import history from './history';

import { Router, Route } from 'react-router-dom';

import ScrollToTop from './components/layouts/ScrollToTop';

import registerServiceWorker from './registerServiceWorker';
// import App from './containers/AppContainer';

import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
import App from './components/App';

// require('dotenv').config()

// Build the middleware for intercepting and dispatching navigation actions
// const middleware = routerMiddleware(history)

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating

ReactDOM.render(
  <Router history={history}>
    <ScrollToTop>
      <Route path="/" component={App}></Route>
    </ScrollToTop>
  </Router>,
  document.getElementById('root')
)

registerServiceWorker();