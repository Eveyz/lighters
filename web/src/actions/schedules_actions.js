import axios from 'axios';

import { GET_SCHEDULES, GET_SCHEDULES_FAILURE, ADD_SCHEDULE, ADD_SCHEDULE_FAILURE, UPDATE_SCHEDULE, UPDATE_SCHEDULE_FAILURE, DELETE_SCHEDULE, DELETE_SCHEDULE_FAILURE } from './constants';

export const getSchedules = (courses_ids) => {
  return (dispatch) => {
    axios.post(`/schedules/query_courses`, {courses_ids: courses_ids})
      .then((response) => {
        dispatch({type: GET_SCHEDULES, payload: response.data})
      })
      .catch((err) => {
        dispatch({type: GET_SCHEDULES_FAILURE, payload: err})
      })
  }
};

export const addSchedule = (schedule) => {
  return (dispatch) => {
    axios.post("/schedules", schedule)
      .then((response) => {
        dispatch({type: ADD_SCHEDULE, payload: response.data})
      })
      .catch((err) => {
        dispatch({type: ADD_SCHEDULE_FAILURE, payload: "there was an error while posting a schedule"})
      })
  }
};

export const updateSchedule = (schedule) => {
  return (dispatch) => {
    axios.put("/schedules/" + schedule.id)
      .then((response) => {
        dispatch({type: UPDATE_SCHEDULE, payload: response.data})
      })
      .catch((err) => {
        dispatch({type: UPDATE_SCHEDULE_FAILURE, payload: err})
      })
  }
};

export const deleteSchedule = (id) => {
  return (dispatch) => {
    axios.delete(`/schedules/${id}`)
      .then((response) => {
        dispatch({type: DELETE_SCHEDULE, payload: id})
      })
      .catch((err) => {
        dispatch({type: DELETE_SCHEDULE_FAILURE, payload: err})
      })
  }
};