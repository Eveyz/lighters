import { SET_MODE } from './constants';

export const setMode = (mode) => {
  return (dispatch) => {
    dispatch({type: SET_MODE, payload: mode})
  }
}