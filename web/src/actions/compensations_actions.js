import axios from 'axios';

import { GET_COMPENSATIONS, GET_COMPENSATIONS_FAILURE, ADD_COMPENSATION, ADD_COMPENSATION_FAILURE, UPDATE_COMPENSATION, UPDATE_COMPENSATION_FAILURE, DELETE_COMPENSATION, DELETE_COMPENSATION_FAILURE } from './constants';

export const getCompensations = (query) => {
  let url = query ? `/compensations/${query}` : `/compensations`;
  return (dispatch) => {
    axios.get(url).then((response) => {
      dispatch({type: GET_COMPENSATIONS, payload: response.data})
    }).catch((err) => {
      dispatch({type: GET_COMPENSATIONS_FAILURE, payload: "there was an error while fetching compensations"})
    })
  }
}

export const addCompensation = (compensation) => {
  return (dispatch) => {
    axios.post(`/compensations`, compensation)
      .then((response) => {
        dispatch({type: ADD_COMPENSATION, payload: response.data})
      })
      .catch((err) => {
        dispatch({type: ADD_COMPENSATION_FAILURE, payload: "there was an error while posting a new entry"})
      })
  }
};

export const updateCompensation = (_id, compensation) => {
  return (dispatch) => {
    axios.put(`/compensations/${_id}`, compensation)
      .then((response) => {
        dispatch({type: UPDATE_COMPENSATION, payload: response.data})
      })
      .catch((err) => {
        dispatch({type: UPDATE_COMPENSATION_FAILURE, payload: err})
      })
  }
};

export const deleteCompensation = (id) => {
  return (dispatch) => {
    axios.delete(`/compensations/${id}`)
      .then((response) => {
        dispatch({type: DELETE_COMPENSATION, payload: id})
      })
      .catch((err) => {
        dispatch({type: DELETE_COMPENSATION_FAILURE, payload: err})
      })
  }
};