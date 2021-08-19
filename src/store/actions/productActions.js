import axios from 'axios';
import {
  GET_LATEST_PRODUCTS,
  CLEAR_LATEST_PRODUCTS,
  LATEST_PRODUCTS_LOADING,
  LATEST_PRODUCTS_ERROR,
  GET_UPLOADED_PRODUCTS_START,
  GET_UPLOADED_PRODUCTS_SUCCESS,
  GET_UPLOADED_PRODUCTS_FAILURE,
  GET_REFINED_PRODUCTS,
  CLEAR_REFINED_PRODUCTS,
  REFINED_PRODUCTS_LOADING,
  REFINED_PRODUCTS_ERROR,
  GET_PRODUCT_DETAIL,
  PRODUCT_DETAIL_LOADING,
  PRODUCT_DETAIL_ERROR,
  CLEAR_PRODUCT_DETAIL
} from './types';
import { UPLOADED_PRODUCTS_API_URL } from '../../utils/URLS';

export const getLatestProducts = index => dispatch => {
  console.log('Dispatch getLatestProducts');
  dispatch({
    type: LATEST_PRODUCTS_LOADING
  });
  axios
    .get(`/api/products/latest/${index}`)
    .then(response => {
      const { data } = response;
      dispatch({
        type: GET_LATEST_PRODUCTS,
        payload: data
      });
    })
    .catch(err => {
      dispatch({
        type: LATEST_PRODUCTS_ERROR,
        payload: err
      });
    });
};

export const clearLatestProducts = () => dispatch => {
  console.log('Dispatch clearLatestProducts');
  dispatch({
    type: CLEAR_LATEST_PRODUCTS
  });
};

export const getRefinedProducts = (category, index) => dispatch => {
  console.log('Dispatch getRefinedProducts');
  dispatch({
    type: REFINED_PRODUCTS_LOADING
  });
  axios
    .get(`/api/products/latest/${category}/${index}`)
    .then(response => {
      const { data } = response;
      dispatch({
        type: GET_REFINED_PRODUCTS,
        payload: data
      });
    })
    .catch(err => {
      dispatch({
        type: REFINED_PRODUCTS_ERROR,
        payload: err
      });
    });
};

export const clearRefinedProducts = () => dispatch => {
  console.log('Dispatch clearRedinedProducts');
  dispatch({
    type: CLEAR_REFINED_PRODUCTS
  });
};

export const getProductDetail = _id => dispatch => {
  console.log('Dispatch getProductDetail');
  dispatch({
    type: PRODUCT_DETAIL_LOADING
  });
  axios
    .get(`/api/products/item/${_id}`)
    .then(response => {
      const { data } = response;
      dispatch({
        type: GET_PRODUCT_DETAIL,
        payload: data
      });
    })
    .catch(err => {
      dispatch({
        type: PRODUCT_DETAIL_ERROR,
        payload: err
      });
    });
};

export const clearProductDetail = () => dispatch => {
  console.log('Dispatch clearProductDetail');
  dispatch({
    type: CLEAR_PRODUCT_DETAIL
  });
};

export const getUploadedProducts = () => dispatch => {
  dispatch({
    type: GET_UPLOADED_PRODUCTS_START
  });

  axios
    .get(UPLOADED_PRODUCTS_API_URL)
    .then(response => {
      const { data } = response.data;

      dispatch({
        type: GET_UPLOADED_PRODUCTS_SUCCESS,
        payload: data.products
      });
    })
    .catch(err => {
      const { response } = err;
      console.log('Uploaded prods error', err);
      if (response && response.status) {
        const { data } = response.data;
        dispatch({
          type: GET_UPLOADED_PRODUCTS_FAILURE,
          payload: data
        });
      }
    });
};
