import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger'
import reduxThunk from 'redux-thunk';
import reducers from './reducers';

const logger = createLogger({
  collapsed: true,
  diff: true,
});
const middleware = [ reduxThunk, logger ];
const store = createStore(reducers, {}, applyMiddleware(...middleware));

export default store;