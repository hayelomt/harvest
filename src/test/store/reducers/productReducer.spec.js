import productReducer from '../../../store/reducers/productReducer';
import {
  GET_UPLOADED_PRODUCTS_START,
  GET_UPLOADED_PRODUCTS_SUCCESS,
  GET_UPLOADED_PRODUCTS_FAILURE
} from '../../../store/actions/types';

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
  }
};

describe('ProductReducer', () => {
  let curState;

  beforeEach(() => {
    curState = productReducer(initialState, {});
  });

  // TODO test reducer BESO
  describe('TEST product.latestproducts state', () => {
    it('should asert state', () => {});
  });

  // TODO test reducer BESO
  describe('TEST product.refinedProducts state', () => {
    it('should asert state', () => {});
  });

  describe('TEST product.uploads state', () => {
    it('Initiates state with falsy values', () => {
      expect(curState).toEqual({
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
        }
      });
    });

    it('reduces GET_UPLOADED_PROUDCTS_START', () => {
      const action = {
        type: GET_UPLOADED_PRODUCTS_START
      };
      curState = productReducer(initialState, action);

      expect(curState).toEqual({
        uploads: {
          errors: {},
          isLoading: true,
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
        }
      });
    });

    it('reduces GET_UPLOADED_PROUDCTS_SUCCESS', () => {
      const action = {
        type: GET_UPLOADED_PRODUCTS_SUCCESS,
        payload: [{ name: 'some name' }, { name: 'sldkfjsldkfj' }]
      };
      curState = productReducer(initialState, action);

      expect(curState).toEqual({
        uploads: {
          errors: {},
          isLoading: false,
          data: action.payload
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
        }
      });
    });

    it('reduces GET_UPLOADED_PROUDCTS_Failure', () => {
      const action = {
        type: GET_UPLOADED_PRODUCTS_FAILURE,
        payload: {
          product: 'Products not found'
        }
      };
      curState = productReducer(initialState, action);

      expect(curState).toEqual({
        uploads: {
          errors: action.payload,
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
        }
      });
    });

    describe('should not affect other states', () => {
      const currentState = {
        uploads: {
          errors: {
            sldfkj: 'slkdfjslkf'
          },
          isLoading: true,
          data: [{ ssfsf: 'sldkfjsldk' }, { sdfsdf: 'sdlkfjsl' }]
        },
        latestProducts: {
          errors: {
            sldfkj: 'slkdfjslkf'
          },
          isLoading: true,
          data: {
            sdlfks: 'sdlfkjsl'
          }
        },
        refinedProducts: {
          errors: {
            sldfkj: 'slkdfjslkf'
          },
          isLoading: true,
          data: {
            sdkjflsdkj: 'sdlfjls'
          }
        }
      };

      beforeEach(() => {
        curState = productReducer(currentState, {});
      });
      it('Initiates state with falsy values', () => {
        expect(curState).toEqual({
          uploads: {
            errors: {
              sldfkj: 'slkdfjslkf'
            },
            isLoading: true,
            data: [{ ssfsf: 'sldkfjsldk' }, { sdfsdf: 'sdlkfjsl' }]
          },
          latestProducts: {
            errors: {
              sldfkj: 'slkdfjslkf'
            },
            isLoading: true,
            data: {
              sdlfks: 'sdlfkjsl'
            }
          },
          refinedProducts: {
            errors: {
              sldfkj: 'slkdfjslkf'
            },
            isLoading: true,
            data: {
              sdkjflsdkj: 'sdlfjls'
            }
          }
        });
      });

      it('reduces GET_UPLOADED_PROUDCTS_START', () => {
        const action = {
          type: GET_UPLOADED_PRODUCTS_START
        };
        curState = productReducer(currentState, action);

        expect(curState).toEqual({
          uploads: {
            errors: {},
            isLoading: true,
            data: []
          },
          latestProducts: {
            errors: {
              sldfkj: 'slkdfjslkf'
            },
            isLoading: true,
            data: {
              sdlfks: 'sdlfkjsl'
            }
          },
          refinedProducts: {
            errors: {
              sldfkj: 'slkdfjslkf'
            },
            isLoading: true,
            data: {
              sdkjflsdkj: 'sdlfjls'
            }
          }
        });
      });

      it('reduces GET_UPLOADED_PROUDCTS_SUCCESS', () => {
        const action = {
          type: GET_UPLOADED_PRODUCTS_SUCCESS,
          payload: [{ name: 'some name' }, { name: 'sldkfjsldkfj' }]
        };
        curState = productReducer(currentState, action);

        expect(curState).toEqual({
          uploads: {
            errors: {},
            isLoading: false,
            data: action.payload
          },
          latestProducts: {
            errors: {
              sldfkj: 'slkdfjslkf'
            },
            isLoading: true,
            data: {
              sdlfks: 'sdlfkjsl'
            }
          },
          refinedProducts: {
            errors: {
              sldfkj: 'slkdfjslkf'
            },
            isLoading: true,
            data: {
              sdkjflsdkj: 'sdlfjls'
            }
          }
        });
      });

      it('reduces GET_UPLOADED_PROUDCTS_Failure', () => {
        const action = {
          type: GET_UPLOADED_PRODUCTS_FAILURE,
          payload: {
            product: 'Products not found'
          }
        };
        curState = productReducer(currentState, action);

        expect(curState).toEqual({
          uploads: {
            errors: action.payload,
            isLoading: false,
            data: [{ ssfsf: 'sldkfjsldk' }, { sdfsdf: 'sdlkfjsl' }]
          },
          latestProducts: {
            errors: {
              sldfkj: 'slkdfjslkf'
            },
            isLoading: true,
            data: {
              sdlfks: 'sdlfkjsl'
            }
          },
          refinedProducts: {
            errors: {
              sldfkj: 'slkdfjslkf'
            },
            isLoading: true,
            data: {
              sdkjflsdkj: 'sdlfjls'
            }
          }
        });
      });
    });
  });
});
