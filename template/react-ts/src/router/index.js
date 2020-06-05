import React from 'react';


import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import PageContainer from '@container/PageContainer';

export default () => (
  <Router>
    <Switch>
      <Route path="/page1" component={PageContainer}/>
      <Route path="/page2" component={PageContainer}/>
      <Route path="/page3" component={PageContainer}/>
      <Route path="/page4" component={PageContainer}/>
      <Route path="/page5" component={PageContainer}/>
      <Redirect to="/page1" />
    </Switch>
  </Router>
);
