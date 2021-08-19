import authReducer from '../../../store/reducers/authReducer';
import {
  SIGNUP_START,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SET_CURRENT_USER,
  LOGOUT
} from '../../../store/actions/types';

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

describe('AuthReducer', () => {
  let curState;

  beforeEach(() => {
    curState = authReducer(initialState, {});
  });

  it('Initiates state with falsy values', () => {
    expect(curState).toEqual({
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
    });
  });

  it('reduces SINGUP_START', () => {
    curState = authReducer(initialState, {
      type: SIGNUP_START
    });

    expect(curState).toEqual({
      signup: {
        isLoading: true,
        errors: {}
      },
      login: {
        isLoading: false,
        errors: {}
      },
      user: null,
      isAuthenticated: false
    });
  });

  it('reduces SINGUP_SUCCESS', () => {
    curState = authReducer(initialState, {
      type: SIGNUP_SUCCESS
    });

    expect(curState).toEqual({
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
    });
  });

  it('reduces SINGUP_FAILURE', () => {
    const action = {
      type: SIGNUP_FAILURE,
      payload: {
        name: 'required'
      }
    };
    curState = authReducer(initialState, action);

    expect(curState).toEqual({
      signup: {
        isLoading: false,
        errors: action.payload
      },
      login: {
        isLoading: false,
        errors: {}
      },
      user: null,
      isAuthenticated: false
    });
  });

  it('reduces LOGIN_START', () => {
    const action = {
      type: LOGIN_START
    };
    curState = authReducer(initialState, action);

    expect(curState).toEqual({
      signup: {
        isLoading: false,
        errors: {}
      },
      login: {
        isLoading: true,
        errors: {}
      },
      user: null,
      isAuthenticated: false
    });
  });

  it('reduces LOGIN_SUCCESS', () => {
    const action = {
      type: LOGIN_SUCCESS,
      payload: {
        name: 'titan',
        userType: 'SELLER'
      }
    };
    curState = authReducer(initialState, action);

    expect(curState).toEqual({
      signup: {
        isLoading: false,
        errors: {}
      },
      login: {
        isLoading: false,
        errors: {}
      },
      user: action.payload,
      isAuthenticated: true
    });
  });

  it('reduces SET_CURRENT_USER', () => {
    const action = {
      type: SET_CURRENT_USER,
      payload: {
        name: 'titan',
        userType: 'BUYER'
      }
    };
    curState = authReducer(initialState, action);

    expect(curState).toEqual({
      signup: {
        isLoading: false,
        errors: {}
      },
      login: {
        isLoading: false,
        errors: {}
      },
      user: action.payload,
      isAuthenticated: true
    });
  });

  it('reduces LOGIN_FAILURE', () => {
    const action = {
      type: LOGIN_FAILURE,
      payload: {
        email: 'Paswowrd mismatch'
      }
    };
    curState = authReducer(initialState, action);

    expect(curState).toEqual({
      signup: {
        isLoading: false,
        errors: {}
      },
      login: {
        isLoading: false,
        errors: action.payload
      },
      user: null,
      isAuthenticated: false
    });
  });

  it('reduces LOGOUT', () => {
    const action = {
      type: LOGOUT
    };
    curState = authReducer(initialState, action);

    expect(curState).toEqual({
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
    });
  });

  describe('should reduce without changing current state', () => {
    const updatedState = {
      signup: {
        isLoading: true,
        errors: {
          name: 'Name field'
        }
      },
      login: {
        isLoading: true,
        errors: {
          password: 'mismatch'
        }
      },
      user: {
        name: 'titan',
        _id: 'sldkjfsldkfjsldkfj'
      },
      isAuthenticated: true
    };

    beforeEach(() => {
      curState = authReducer(updatedState, {});
    });

    it('Initiates state with falsy values', () => {
      expect(curState).toEqual({
        signup: {
          isLoading: true,
          errors: {
            name: 'Name field'
          }
        },
        login: {
          isLoading: true,
          errors: {
            password: 'mismatch'
          }
        },
        user: {
          name: 'titan',
          _id: 'sldkjfsldkfjsldkfj'
        },
        isAuthenticated: true
      });
    });

    it('reduces SINGUP_START', () => {
      curState = authReducer(updatedState, {
        type: SIGNUP_START
      });

      expect(curState).toEqual({
        signup: {
          isLoading: true,
          errors: {}
        },
        login: {
          isLoading: true,
          errors: {
            password: 'mismatch'
          }
        },
        user: {
          name: 'titan',
          _id: 'sldkjfsldkfjsldkfj'
        },
        isAuthenticated: true
      });
    });

    it('reduces SINGUP_SUCCESS', () => {
      curState = authReducer(updatedState, {
        type: SIGNUP_SUCCESS
      });

      expect(curState).toEqual({
        signup: {
          isLoading: false,
          errors: {}
        },
        login: {
          isLoading: true,
          errors: {
            password: 'mismatch'
          }
        },
        user: {
          name: 'titan',
          _id: 'sldkjfsldkfjsldkfj'
        },
        isAuthenticated: true
      });
    });

    it('reduces SINGUP_FAILURE', () => {
      const action = {
        type: SIGNUP_FAILURE,
        payload: {
          name: 'required'
        }
      };
      curState = authReducer(updatedState, action);

      expect(curState).toEqual({
        signup: {
          isLoading: false,
          errors: action.payload
        },
        login: {
          isLoading: true,
          errors: {
            password: 'mismatch'
          }
        },
        user: {
          name: 'titan',
          _id: 'sldkjfsldkfjsldkfj'
        },
        isAuthenticated: true
      });
    });

    it('reduces LOGIN_START', () => {
      const action = {
        type: LOGIN_START
      };
      curState = authReducer(updatedState, action);

      expect(curState).toEqual({
        signup: {
          isLoading: true,
          errors: {
            name: 'Name field'
          }
        },
        login: {
          isLoading: true,
          errors: {}
        },
        user: null,
        isAuthenticated: false
      });
    });

    it('reduces LOGIN_SUCCESS', () => {
      const action = {
        type: LOGIN_SUCCESS,
        payload: {
          name: 'titan',
          userType: 'SELLER'
        }
      };
      curState = authReducer(updatedState, action);

      expect(curState).toEqual({
        signup: {
          isLoading: true,
          errors: {
            name: 'Name field'
          }
        },
        login: {
          isLoading: false,
          errors: {}
        },
        user: action.payload,
        isAuthenticated: true
      });
    });

    it('reduces SET_CURRENT_USER', () => {
      const action = {
        type: SET_CURRENT_USER,
        payload: {
          name: 'titan',
          userType: 'BUYER'
        }
      };
      curState = authReducer(updatedState, action);

      expect(curState).toEqual({
        signup: {
          isLoading: true,
          errors: {
            name: 'Name field'
          }
        },
        login: {
          isLoading: false,
          errors: {}
        },
        user: action.payload,
        isAuthenticated: true
      });
    });

    it('reduces LOGIN_FAILURE', () => {
      const action = {
        type: LOGIN_FAILURE,
        payload: {
          email: 'Paswowrd mismatch'
        }
      };
      curState = authReducer(updatedState, action);

      expect(curState).toEqual({
        signup: {
          isLoading: true,
          errors: {
            name: 'Name field'
          }
        },
        login: {
          isLoading: false,
          errors: action.payload
        },
        user: null,
        isAuthenticated: false
      });
    });

    it('reduces LOGOUT', () => {
      const action = {
        type: LOGOUT
      };
      curState = authReducer(updatedState, action);

      expect(curState).toEqual({
        signup: {
          isLoading: true,
          errors: {
            name: 'Name field'
          }
        },
        login: {
          isLoading: true,
          errors: {
            password: 'mismatch'
          }
        },
        user: null,
        isAuthenticated: false
      });
    });
  });
});
