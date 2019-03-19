//Copyright (c) 2016-2017 Shafeen Tejani. Released under GPLv3.
import { combineReducers } from "redux";

import { FULLY_CONNECTED_EVALUATED, CONVOLUTIONAL_EVALUATED } from '../actions/EvaluateActions';
import { INPUT_CLEARED } from '../actions/InputActions';

const initialState = {
  fully_connected: null,
  convolutional: null,
  input_image: { data: [], size: 0 },
  rescaled_input: null
};

const fullyConnected = (state = null, action) => {
  switch (action.type) {
    case FULLY_CONNECTED_EVALUATED:
      return Object.assign({}, action.payload);
    case INPUT_CLEARED:
      return null;
    default:
      return state;
  }
};

const convolutional = (state = null, action) => {
  switch (action.type) {
    case CONVOLUTIONAL_EVALUATED:
      return Object.assign({}, action.payload);
    case INPUT_CLEARED:
        return null;
    default:
      return state;
  }
};

export default combineReducers({
  convolutional: convolutional,
  fully_connected: fullyConnected,
})
