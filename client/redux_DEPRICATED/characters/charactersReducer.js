import _defaultsDeep from 'lodash/defaultsDeep';
import {
  GET_CHARACTER,
  GET_CHARACTER_SUCCESS,
  GET_CHARACTER_FAILURE,
} from './charactersConstants';

const initialState = {};

function charactersReducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_CHARACTER: {
      const newState = _defaultsDeep({
        [payload.idPk]: {
          loading: true,
        },
      }, state);

      return newState;
    }
    case GET_CHARACTER_SUCCESS: {
      const newState = _defaultsDeep({
        [payload.idPk]: {
          ...payload,
          loading: false,
          error: false,
        },
      }, state);

      return newState;
    }
    case GET_CHARACTER_FAILURE: {
      const newState = _defaultsDeep({
        [payload.idPk]: {
          loading: false,
          error: payload.error,
        },
      }, state);

      return newState;
    }
    default: {
      return state;
    }
  }
}

export default charactersReducer;
