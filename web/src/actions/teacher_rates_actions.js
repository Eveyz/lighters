import axios from 'axios';

import { GET_TEACHER_RATES, GET_TEACHER_RATES_FAILURE, ADD_TEACHER_RATE, ADD_TEACHER_RATE_FAILURE, UPDATE_TEACHER_RATE, UPDATE_TEACHER_RATE_FAILURE, DELETE_TEACHER_RATE, DELETE_TEACHER_RATE_FAILURE } from './constants';

export const getTeacherRates = (query) => {
  let url = query ? `/teacher_rates/?${query}` : `/teacher_rates`;
  return (dispatch) => {
    axios.get(url).then((response) => {
      dispatch({type: GET_TEACHER_RATES, payload: response.data})
    }).catch((err) => {
      dispatch({type: GET_TEACHER_RATES_FAILURE, payload: "there was an error while fetching teacher rates"})
    })
  }
}

export const addTeacherRate = (teacher_rate) => {
  return (dispatch) => {
    axios.post(`/teacher_rates`, teacher_rate)
      .then((response) => {
        dispatch({type: ADD_TEACHER_RATE, payload: response.data})
        window.Materialize.toast('成功添加', 1000, 'green');
      })
      .catch((err) => {
        dispatch({type: ADD_TEACHER_RATE_FAILURE, payload: "there was an error while posting a new teacher rate"})
      })
  }
};

export const updateTeacherRate = (teacher_rate) => {
  let {_id, ..._teacher_rate} = teacher_rate
  return (dispatch) => {
    axios.put(`/teacher_rates/${_id}`, _teacher_rate)
      .then((response) => {
        dispatch({type: UPDATE_TEACHER_RATE, payload: response.data})
        window.Materialize.toast('成功更新', 1000, 'green');
      })
      .catch((err) => {
        dispatch({type: UPDATE_TEACHER_RATE_FAILURE, payload: err})
      })
  }
};

export const deleteTeacherRate = (id) => {
  return (dispatch) => {
    axios.delete(`/teacher_rates/${id}`)
      .then((response) => {
        dispatch({type: DELETE_TEACHER_RATE, payload: id})
      })
      .catch((err) => {
        dispatch({type: DELETE_TEACHER_RATE_FAILURE, payload: err})
      })
  }
};