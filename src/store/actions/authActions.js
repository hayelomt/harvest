import axios from 'axios';
import Router from 'next/router';
import {
  SIGNUP_START,
  SIGNUP_FAILURE,
  SIGNUP_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT,
  LOGIN_START,
  SET_CURRENT_USER
} from './types';
import {
  SIGNUP_API_URL,
  LOGIN_API_URL,
  LOGOUT_API_URL,
  API_URL
} from '../../utils/URLS';

export const signup = userData => dispatch => {
  dispatch({
    type: SIGNUP_START
  });

  axios
    .post(SIGNUP_API_URL, userData)
    .then(response => {
      const { data } = response;
      // console.log('Post data', data);
      Router.push('/login');
      dispatch({
        type: SIGNUP_SUCCESS,
        payload: data.user
      });
    })
    .catch(err => {
      const { response } = err;
      if (response.status === 400) {
        const { data } = response.data;
        dispatch({
          type: SIGNUP_FAILURE,
          payload: data
        });
      }
    });
};

//set current user after login
export const setCurrentUser = JWT => {
  return {
    type: LOGIN_SUCCESS,
    payload: JWT
  };
};

//Log in to get user token
export const login = userData => dispatch => {
  dispatch({
    type: LOGIN_START
  });

  // console.log('User data', userData);

  axios
    .post(LOGIN_API_URL, userData)
    .then(response => {
      const { data } = response.data;
      // console.log('Login response', data);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: data.user
      });
    })
    .catch(err => {
      const { response } = err;
      if (response.status === 400) {
        const { message } = response.data;
        const data = {
          message
        };
        dispatch({
          type: LOGIN_FAILURE,
          payload: data
        });
      }
    });
};

/*
 * Check whether a user is authenticated when a page is rendered on server
 *
 * @param {Request} req request object from express
 */
export const checkUserAuth = req => dispatch => {
  return new Promise(resolve => {
    let token;

    // Fetch token from authorization header if it exists
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    // console.log('Check who am i start');

    if (token) {
      // Check if token is authentic on server
      axios
        .post(`${API_URL}/auth/whoami/${token}`)
        .then(response => {
          const { data } = response.data;
          // console.log('Valid token');

          dispatch({
            type: SET_CURRENT_USER,
            payload: data.user
          });
          return resolve();
        })
        .catch(apiErr => {
          if (apiErr.response) {
            console.error(
              'Check user api error [response]',
              apiErr.response.data
            );
          } else {
            console.error('Check user api error [data]', apiErr);
          }

          return resolve(null);
        });
    } else {
      return resolve(null);
    }
  });
};

export const logout = () => dispatch => {
  // TODO handle logout api
  //set current user to empty obj and isAuthenticated false
  axios
    .post(LOGOUT_API_URL)
    .then(res => {
      dispatch({
        type: LOGOUT
      });
      console.log('Api successflly logged out');
      Router.push('/');
    })
    .catch(err => {
      console.log('Api Logout error', err.response.data);
    });
};
