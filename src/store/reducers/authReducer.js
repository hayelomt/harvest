import {
  SIGNUP_START,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  // LOGOUT,
  LOGIN_START,
  SET_CURRENT_USER,
  LOGOUT
} from '../actions/types';
import isEmpty from '../../utils/isEmpty';

const initialState = {
  signup: {
    isLoading: false,
    errors: {}
  },
  login: {
    isLoading: false,
    errors: {}
  },
  user: null,
  isAuthenticated: false
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case SIGNUP_START:
      return {
        ...state,
        signup: {
          isLoading: true,
          errors: {}
        }
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        signup: {
          isLoading: false,
          errors: {}
        }
      };
    case SIGNUP_FAILURE:
      return {
        ...state,
        signup: {
          isLoading: false,
          errors: action.payload
        }
      };
    case LOGIN_START:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        login: {
          isLoading: true,
          errors: {}
        }
      };
    case LOGIN_SUCCESS:
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
        login: {
          isLoading: false,
          errors: {}
        }
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        login: {
          isLoading: false,
          errors: action.payload
        }
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false
      };
    default:
      return state;
  }
}
