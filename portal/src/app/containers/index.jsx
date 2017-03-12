import React from 'react';
import Router from 'react-router/lib/Router';
import Route from 'react-router/lib/Route';
import Redirect from 'react-router/lib/Redirect';
import browserHistory from 'react-router/lib/browserHistory';

import App from './App';
import APnxg from './AP';

// const routes = (
//   <Router history={browserHistory}>
//     <Redirect from={'/'} to={'/app/fb-travel'} />
//     <Route path="/app/fb-travel" component={App} />
//     <Route path="/app/nxg" component={APnxg} />
//   </Router>
// );

const routes = (
  <Router history={browserHistory}>
    <Route path="/app/report" component={App} />
    <Route path="/app/photo" component={APnxg} />
  </Router>
);

export default routes;