import {
  ADD_ITEM,
  REMOVE_ITEM,
  ADDING_ITEM,
  REMOVING_ITEM,
  FETCHING_CART_ITEMS,
  FETCH_CART_ITEMS,
  CART_ERROR,
  REMOVE_ALL
} from '../actions/types';

const initialState = {
  isAdding: false,
  isRemoving: false,

  cartItems: {
    isEmpty: true,
    isLoading: false,
    items: []
  },
  errors: {}
};

let removedCart;

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case FETCHING_CART_ITEMS:
      //   console.log('fetching sfsdfasdf', state.cartItems.items.length === 0);
      return {
        ...state,
        errors: {},
        cartItems: {
          ...state.cartItems,
          isLoading: true
        }
      };
    case FETCH_CART_ITEMS:
      console.log();
      return {
        ...state,
        errors: {},
        cartItems: {
          ...state.cartItems,
          isEmpty: state.cartItems.items.length === 0,
          isLoading: false
        }
      };
    case ADDING_ITEM:
      return {
        ...state,
        isAdding: true,
        cartItems: {
          ...state.cartItems,
          isEmpty: state.cartItems.items.length === 0
        }
      };
    case ADD_ITEM:
      state.cartItems.items.push(action.payload);

      return {
        ...state,
        isAdding: false,
        cartItems: {
          ...state.cartItems,
          isEmpty: state.cartItems.items.length === 0
        },
        errors: {}
      };
    case REMOVING_ITEM:
      return {
        ...state,
        isRemoving: true,
        cartItems: {
          ...state.cartItems
        }
      };
    case REMOVE_ITEM:
      //   console.log('payload', action.payload);
      removedCart = state.cartItems.items.filter(
        item => item.props.id !== action.payload
      );
      //   console.log('||-----|', state.cartItems.items);
      //   console.log('after deletion', removedCart);

      return {
        ...state,
        isRemoving: false,
        errors: {},
        cartItems: {
          ...state.cartItems,
          items: removedCart
        }
      };
    case REMOVE_ALL:
      return {
        ...state,
        isRemoving: false,
        errors: {},
        cartItems: {
          ...state.cartItems,
          items: [],
          isEmpty: true
        }
      };
    case CART_ERROR:
      return {
        ...state,
        errors: action.payload
      };
    default:
      return state;
  }
}
