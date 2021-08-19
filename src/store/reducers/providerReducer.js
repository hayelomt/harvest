import {
  FETCH_PROVIDERS,
  FETCHING_PROVIDERS,
  FETCH_PROVIDERS_ERROR
} from '../actions/types';
// import isEmpty from '../../utils/isEmpty';

const initialState = {
  isLoading: false,
  errors: {},
  data: []
};

export default function providersReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PROVIDERS:
      // console.log('fetch providers', action.payload);
      return {
        ...state,
        isLoading: false,
        errors: {},
        data: action.payload
      };

    case FETCHING_PROVIDERS:
      return {
        ...state,
        isLoading: true
      };
    case FETCH_PROVIDERS_ERROR:
      return {
        isLoading: false,
        errors: action.payload,
        data: {}
      };
    default:
      return state;
  }
}
