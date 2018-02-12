import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer from './reducer';
import sagas from './sagas';

const initStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  let middleware = applyMiddleware(sagaMiddleware);

  if (process.browser && process.env.NODE_ENV !== 'production') {
    const devToolsExtension = window.devToolsExtension;
    if (typeof devToolsExtension === 'function') {
      middleware = compose(middleware, devToolsExtension());
    }
  }

  const store = createStore(reducer, middleware);
  sagaMiddleware.run(sagas);

  return store;
};

export default initStore();
