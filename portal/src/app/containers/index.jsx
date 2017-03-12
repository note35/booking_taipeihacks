import React from 'react';
import Router from 'react-router/lib/Router';
import Route from 'react-router/lib/Route';
import Redirect from 'react-router/lib/Redirect';
import browserHistory from 'react-router/lib/browserHistory';

import TravelInfo from 'containers/TravelInfo';
import PhotoAnalytics from 'containers/PhotoAnalytics';
import APnxg from './AP';
import App from './App';

// const routes = (
//   <Router history={browserHistory}>
//     <Redirect from={'/'} to={'/app/fb-travel'} />
//     <Route path="/app/fb-travel" component={App} />
//     <Route path="/app/nxg" component={APnxg} />
//   </Router>
// );

const routes = (
  <Router history={browserHistory}>
    <Route component={App}>
    <Route path={'/app/report'} component={TravelInfo} />
    <Route path={'/app/photo'} component={PhotoAnalytics} />
    </Route>
  </Router>
);

export default routes;