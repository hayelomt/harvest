import axios from 'axios';
import {
  FETCH_PROVIDERS,
  FETCHING_PROVIDERS,
  FETCH_PROVIDERS_ERROR
} from './types';
import { PROVIDERS_API_URL } from '../../utils/URLS';

export const setFetchProvidersError = err => {
  console.log('Dispatch setFetchProvidersError');
  return {
    type: FETCH_PROVIDERS_ERROR,
    payload: err
  };
};

export const fetchProviders = () => dispatch => {
  console.log('Dispatch getLatestProducts');
  dispatch({
    type: FETCHING_PROVIDERS
  });

  axios
    .get(PROVIDERS_API_URL)
    .then(res => {
      // console.log('axiios', res.data.data.providersName);
      const { providersName } = res.data.data;
      dispatch({
        type: FETCH_PROVIDERS,
        payload: providersName
      });
    })
    .catch(err => {
      setFetchProvidersError(err);
    });
};
