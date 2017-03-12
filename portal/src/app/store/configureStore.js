import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import reducer from '../reducers';
import sagas from '../sagas';

const sagaMiddleware = createSagaMiddleware();
const logger = createLogger();

export default function configureStore() {
  const store = (process.env.NODE_ENV !== 'production') ? createStore(
    reducer,
    applyMiddleware(
      sagaMiddleware, 
      logger,
    ),
  ) : createStore( reducer, applyMiddleware(sagaMiddleware));

  sagaMiddleware.run(sagas);

  return store;
}
