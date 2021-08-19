import globalReducer from '../../../store/reducers/globalReducer';
import {
  START_LOADING_APP,
  FINISH_LOADING_APP,
  SET_GLOBAL_ERROR,
  CLEAR_GLOBAL_ERROR
} from '../../../store/actions/types';

const initialState = {
  isLoading: false,
  error: null
};

describe('GlobalReducer', () => {
  let curState;

  beforeEach(() => {
    curState = globalReducer(initialState, {});
  });

  it('Initiates state with falsy values', () => {
    expect(curState).toEqual({
      isLoading: false,
      error: null
    });
  });

  it('reduces START_LOADING_APP', () => {
    const action = {
      type: START_LOADING_APP
    };
    curState = globalReducer(initialState, action);

    expect(curState).toEqual({
      isLoading: true,
      error: null
    });
  });

  it('reduces FINISH_LOADING_APP', () => {
    const action = {
      type: FINISH_LOADING_APP
    };
    curState = globalReducer(initialState, action);

    expect(curState).toEqual({
      isLoading: false,
      error: null
    });
  });

  it('reduces SET_GLOBAL_ERROR', () => {
    const action = {
      type: SET_GLOBAL_ERROR,
      payload: {
        authroization: 'Not authorized'
      }
    };
    curState = globalReducer(initialState, action);

    expect(curState).toEqual({
      isLoading: false,
      error: action.payload
    });
  });

  it('reduces CLEAR_GLOBAL_ERROR', () => {
    const action = {
      type: CLEAR_GLOBAL_ERROR
    };
    curState = globalReducer(initialState, action);

    expect(curState).toEqual({
      isLoading: false,
      error: null
    });
  });

  describe('should reduce without affecting other states', () => {
    const currentState = {
      isLoading: true,
      error: {
        name: 'INvalid name'
      }
    };

    beforeEach(() => {
      curState = globalReducer(currentState, {});
    });

    it('Initiates state with truthy values', () => {
      expect(curState).toEqual({
        isLoading: true,
        error: {
          name: 'INvalid name'
        }
      });
    });

    it('reduces START_LOADING_APP', () => {
      const action = {
        type: START_LOADING_APP
      };
      curState = globalReducer(currentState, action);

      expect(curState).toEqual({
        isLoading: true,
        error: {
          name: 'INvalid name'
        }
      });
    });

    it('reduces FINISH_LOADING_APP', () => {
      const action = {
        type: FINISH_LOADING_APP
      };
      curState = globalReducer(currentState, action);

      expect(curState).toEqual({
        isLoading: false,
        error: {
          name: 'INvalid name'
        }
      });
    });

    it('reduces SET_GLOBAL_ERROR', () => {
      const action = {
        type: SET_GLOBAL_ERROR,
        payload: {
          authroization: 'Not authorized'
        }
      };
      curState = globalReducer(currentState, action);

      expect(curState).toEqual({
        isLoading: true,
        error: action.payload
      });
    });

    it('reduces CLEAR_GLOBAL_ERROR', () => {
      const action = {
        type: CLEAR_GLOBAL_ERROR
      };
      curState = globalReducer(currentState, action);

      expect(curState).toEqual({
        isLoading: true,
        error: null
      });
    });
  });
});
