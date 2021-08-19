import { combineReducers } from 'redux';
import authReducer from './authReducer';
import productReducer from './productReducer';
import someReducer from './someReducer';
import providerReducer from './providerReducer';
import cartReducer from './cartReducer';
import globalReducer from './globalReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  global: globalReducer,
  product: productReducer,
  provider: providerReducer,
  some: someReducer,
  cart: cartReducer
});

export default rootReducer;
