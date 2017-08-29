import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducers from './reducers';

const middleware = [
  thunkMiddleware,
].filter(Boolean);

export default function create(initialState) {
  return createStore(reducers, initialState, applyMiddleware(...middleware));
}
