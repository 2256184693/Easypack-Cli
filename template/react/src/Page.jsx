import React from 'react';


import {
  HashRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import App from './App';

import NotFound from '@components/NotFound';

export default () => (
  <Router>
    <Switch>
      <Route path="/notfound" component={NotFound}/>
      <Route path="/" component={App}/>
    </Switch>
  </Router>
);
