import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './reducers';

const initialState = {};
const middlewares = [thunk];

export default function makeStore(initState = initialState, options) {
  return createStore(
    rootReducer,
    initState,
    composeWithDevTools(applyMiddleware(...middlewares))
  );
}
