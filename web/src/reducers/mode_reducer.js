import { SET_MODE } from '../actions/constants';

const initialState = {
  value: ""
}

export default (state = initialState, action) => {
  switch(action.type) {
    case SET_MODE:
      return {
        value: action.payload
      }
    default:
      return state;
  }
};