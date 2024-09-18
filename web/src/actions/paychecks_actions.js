import axios from 'axios';

import { GET_PAYCHECKS, GET_PAYCHECKS_FAILURE, UPDATE_PAYCHECK, UPDATE_PAYCHECK_FAILURE, SELECT_PAYCHECK } from './constants';

export const selectPaycheck = (paycheck) => {
  return (dispatch) => {
    dispatch({type: SELECT_PAYCHECK, payload: paycheck})
  }
}

export const getPaychecks = (query) => {
  return (dispatch) => {
    axios.get(`/paychecks${query}`).then((response) => {
      dispatch({type: GET_PAYCHECKS, payload: response.data})
    }).catch((err) => {
      dispatch({type: GET_PAYCHECKS_FAILURE, payload: "there was an error while fetching paychecks"})
    })
  }
}

export const updatePaycheck = (_id, paycheck) => {
  return (dispatch) => {
    axios.put(`/paychecks/${_id}`, paycheck)
      .then((response) => {
        dispatch({type: UPDATE_PAYCHECK, payload: response.data})
      })
      .catch((err) => {
        dispatch({type: UPDATE_PAYCHECK_FAILURE, payload: err})
      })
  }
};