import { render } from 'react-dom';
import React from 'react'
import { Provider } from 'react-redux'

import App from './containers/App';
import routes from './containers';
import configureStore from './store/configureStore';

// copy files
import index from 'file-loader?name=./index.html!root/views/index.html';

const store = configureStore();

render( 
  <Provider store={store}>
    {routes}
  </Provider>,
  document.getElementById('root')
);
