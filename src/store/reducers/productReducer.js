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
} from '../actions/types';

const initialState = {
  uploads: {
    errors: {},
    isLoading: false,
    data: []
  },
  latestProducts: {
    errors: {},
    isLoading: false,
    data: {}
  },
  refinedProducts: {
    errors: {},
    isLoading: false,
    data: {}
  },
  product: {
    errors: {},
    isLoading: false,
    data: {}
  }
};

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCT_DETAIL:
      return {
        ...state,
        product: {
          isLoading: false,
          errors: {},
          data: action.payload.data
        }
      };
    case CLEAR_PRODUCT_DETAIL:
      return {
        ...state,
        product: {
          isLoading: false,
          errors: {},
          data: {}
        }
      };
    case PRODUCT_DETAIL_LOADING:
      return {
        ...state,
        product: {
          ...state.product,
          isLoading: true
        }
      };
    case PRODUCT_DETAIL_ERROR:
      return {
        ...state,
        product: {
          isLoading: false,
          errors: action.payload,
          data: {}
        }
      };
    case GET_LATEST_PRODUCTS:
      return {
        ...state,
        latestProducts: {
          isLoading: false,
          errors: {},
          data: action.payload.data
        }
      };
    case CLEAR_LATEST_PRODUCTS:
      return {
        ...state,
        latestProducts: {
          isLoading: false,
          errors: {},
          data: {}
        }
      };
    case LATEST_PRODUCTS_LOADING:
      return {
        ...state,
        latestProducts: {
          ...state.latestProducts,
          isLoading: true
        }
      };
    case LATEST_PRODUCTS_ERROR:
      return {
        ...state,
        latestProducts: {
          isLoading: false,
          errors: action.payload,
          data: {}
        }
      };
    case GET_REFINED_PRODUCTS:
      return {
        ...state,
        refinedProducts: {
          isLoading: false,
          errors: {},
          data: action.payload.data
        }
      };
    case CLEAR_REFINED_PRODUCTS:
      return {
        ...state,
        refinedProducts: {
          isLoading: false,
          errors: {},
          data: {}
        }
      };
    case REFINED_PRODUCTS_LOADING:
      return {
        ...state,
        refinedProducts: {
          ...state.refinedProducts,
          isLoading: true
        }
      };
    case REFINED_PRODUCTS_ERROR:
      return {
        ...state,
        refinedProducts: {
          isLoading: false,
          errors: action.payload,
          data: {}
        }
      };
    case GET_UPLOADED_PRODUCTS_START:
      return {
        ...state,
        uploads: {
          ...state.uploads,
          isLoading: true,
          errors: {},
          data: []
        }
      };
    case GET_UPLOADED_PRODUCTS_SUCCESS:
      return {
        ...state,
        uploads: {
          ...state.uploads,
          isLoading: false,
          data: action.payload,
          errors: {}
        }
      };
    case GET_UPLOADED_PRODUCTS_FAILURE:
      return {
        ...state,
        uploads: {
          ...state.uploads,
          isLoading: false,
          errors: action.payload
        }
      };
    default:
      return state;
  }
}
