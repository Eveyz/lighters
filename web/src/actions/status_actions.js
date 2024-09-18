import { SET_ERR_MSG, SET_LOADING_STATUS, SET_SUCCESS_STATUS } from './constants';

export const setLoadingStatus = (loading) => {
  return (dispatch) => {
    dispatch({type: SET_LOADING_STATUS, payload: loading})
  }
};

export const setSuccessStatus = (status) => {
  return (dispatch) => {
    dispatch({type: SET_SUCCESS_STATUS, payload: status})
  }
};

export const setErrMsg = (err) => {
  return (dispatch) => {
    dispatch({type: SET_ERR_MSG, payload: err})
  }
};