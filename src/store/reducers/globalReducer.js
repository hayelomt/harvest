import {
  START_LOADING_APP,
  FINISH_LOADING_APP,
  SET_GLOBAL_ERROR,
  CLEAR_GLOBAL_ERROR
} from '../actions/types';

const initState = {
  isLoading: false,
  error: null
};

export default function(state = initState, action) {
  switch (action.type) {
    case START_LOADING_APP:
      return {
        ...state,
        isLoading: true
      };
    case FINISH_LOADING_APP:
      return {
        ...state,
        isLoading: false
      };
    case SET_GLOBAL_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case CLEAR_GLOBAL_ERROR:
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
}
