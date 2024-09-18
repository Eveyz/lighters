import axios from 'axios';

import { GET_LOW_BALANCE_STUDENTS, GET_TUITIONS, GET_TUITIONS_FAILURE, ADD_TUITION, ADD_TUITION_FAILURE, UPDATE_TUITION, UPDATE_TUITION_FAILURE, DELETE_TUITION, DELETE_TUITION_FAILURE } from './constants';

export const getTuitions = (query) => {
  let url = query ? `/tuitions/?${query}` : `/tuitions`;
  return (dispatch) => {
    axios.get(url).then((response) => {
      dispatch({type: GET_TUITIONS, payload: response.data})
    }).catch((err) => {
      dispatch({type: GET_TUITIONS_FAILURE, payload: "there was an error while fetching tuitions"})
    })
  }
}

export const addTuition = (tuition) => {
  return (dispatch) => {
    axios.post(`/tuitions`, tuition)
      .then((response) => {
        dispatch({type: ADD_TUITION, payload: response.data.tuition})
        dispatch({type: GET_LOW_BALANCE_STUDENTS, payload: response.data.students})
        window.Materialize.toast('成功添加', 1000, 'green');
      })
      .catch((err) => {
        dispatch({type: ADD_TUITION_FAILURE, payload: "there was an error while posting a new tuition"})
      })
  }
};

export const updateTuition = (tuition) => {
  let {_id, ..._tuition} = tuition
  return (dispatch) => {
    axios.put(`/tuitions/${_id}`, _tuition)
      .then((response) => {
        dispatch({type: UPDATE_TUITION, payload: response.data.tuition})
        dispatch({type: GET_LOW_BALANCE_STUDENTS, payload: response.data.students})
        window.Materialize.toast('成功更新', 1000, 'green');
      })
      .catch((err) => {
        dispatch({type: UPDATE_TUITION_FAILURE, payload: err})
      })
  }
};

export const deleteTuition = (id) => {
  return (dispatch) => {
    axios.delete(`/tuitions/${id}`)
      .then((response) => {
        dispatch({type: DELETE_TUITION, payload: id})
        dispatch({type: GET_LOW_BALANCE_STUDENTS, payload: response.data})
        window.Materialize.toast('成功删除', 1000, 'green');
      })
      .catch((err) => {
        dispatch({type: DELETE_TUITION_FAILURE, payload: err})
      })
  }
};