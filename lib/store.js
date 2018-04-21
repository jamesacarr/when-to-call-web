import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './ducks';

export default initialState => {
  let middleware = applyMiddleware(thunk);

  if (process.browser && process.env.NODE_ENV !== 'production') {
    const devToolsExtension = window.devToolsExtension;
    if (typeof devToolsExtension === 'function') {
      middleware = compose(middleware, devToolsExtension());
    }
  }

  const store = createStore(rootReducer, initialState, middleware);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./ducks', async () => {
      const { default: nextRootReducer } = await import('./ducks');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};
