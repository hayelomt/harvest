import {
  ADD_ITEM,
  REMOVE_ITEM,
  ADDING_ITEM,
  REMOVING_ITEM,
  CART_ERROR,
  FETCH_CART_ITEMS,
  FETCHING_CART_ITEMS,
  REMOVE_ALL
} from './types';

export const fetchCartItems = () => dispatch => {
  dispatch({
    type: FETCHING_CART_ITEMS
  });
  dispatch({
    type: FETCH_CART_ITEMS
  });
};

export const addToCart = item => dispatch => {
  // error handling
  dispatch({
    type: ADDING_ITEM
  });
  dispatch({
    type: ADD_ITEM,
    payload: item
  });
  dispatch(fetchCartItems());
};

export const removeFromCart = item => dispatch => {
  dispatch({
    type: REMOVING_ITEM
  });

  dispatch({
    type: REMOVE_ITEM,
    payload: item
  });
  dispatch(fetchCartItems());
};

export const removeAll = () => dispatch => {
  dispatch({
    type: REMOVING_ITEM
  });

  dispatch({
    type: REMOVE_ALL
  });
};

export const setCartError = err => dispatch => {
  dispatch({
    type: CART_ERROR,
    payload: err
  });
};
