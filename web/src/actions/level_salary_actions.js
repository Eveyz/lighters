import axios from 'axios';
import history from '../history';
import { GET_LEVEL_SALARY, GET_LEVEL_SALARY_FAILURE, ADD_LEVEL_SALARY, ADD_LEVEL_SALARY_FAILURE, DELETE_LEVEL_SALARY, DELETE_LEVEL_SALARY_FAILURE, UPDATE_LEVEL_SALARY, UPDATE_LEVEL_SALARY_FAILURE, SET_LOADING_STATUS } from './constants';

export const getLevelSalaries = () => {
  return (dispatch) => {
    dispatch({type: SET_LOADING_STATUS, payload: true});
    axios.get(`/level_salaries`)
      .then((response) => {
        dispatch({type: GET_LEVEL_SALARY, payload: response.data})
        dispatch({type: SET_LOADING_STATUS, payload: false});
      })
      .catch((err) => {
        dispatch({type: GET_LEVEL_SALARY_FAILURE, payload: err})
      })
  }
};

export const addLevelSalary = (entry) => {
  return (dispatch) => {
    axios.post(`/level_salaries`, entry)
      .then((response) => {
        dispatch({type: ADD_LEVEL_SALARY, payload: response.data})
        history.push("/assets/level_salaries");
        window.Materialize.toast('成功添加', 1000, 'green');
      })
      .catch((err) => {
        dispatch({type: ADD_LEVEL_SALARY_FAILURE, payload: "there was an error while posting a new entry"})
      })
  }
};

export const updateLevelSalary = (entry) => {
  let {_id, ..._entry} = entry
  return (dispatch) => {
    axios.put(`/level_salaries/${_id}`, _entry)
      .then((response) => {
        dispatch({type: UPDATE_LEVEL_SALARY, payload: response.data})
        window.Materialize.toast('成功更新', 1000, 'green');
      })
      .catch((err) => {
        dispatch({type: UPDATE_LEVEL_SALARY_FAILURE, payload: err})
      })
  }
};

export const deleteLevelSalary = (id) => {
  return (dispatch) => {
    axios.delete(`/level_salaries/${id}`)
      .then((response) => {
        dispatch({type: DELETE_LEVEL_SALARY, payload: id})
        window.Materialize.toast('删除成功', 1000, 'green');
      })
      .catch((err) => {
        dispatch({type: DELETE_LEVEL_SALARY_FAILURE, payload: err})
      })
  }
};