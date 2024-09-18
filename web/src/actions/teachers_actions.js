import axios from 'axios';
import history from '../history';
import { GET_TEACHERS, GET_TEACHERS_FAILURE, GET_TEACHER_FAILURE, GET_ACTIVE_TEACHERS_FAILURE, GET_REPORTS, GET_REPORTS_FAILURE, SELECT_TEACHER, GET_COURSES, GET_COURSES_FAILURE, SET_LOADING_STATUS } from './constants';
import { setCurrentIdentityData } from './users_actions';

export const getTeacher = (id) => {
  return (dispatch) => {
    axios.get(`/teachers/${id}`)
      .then((response) => {
        dispatch(setCurrentIdentityData(response.data));
      })
      .catch((err) => {
        dispatch({type: GET_TEACHER_FAILURE, payload: err})
      })
  }
};

export const getTeacherData = (id) => {
  return (dispatch) => {
    axios.get(`/teachers/${id}`)
      .then((response) => {
        dispatch({type: SELECT_TEACHER, payload: response.data})
        dispatch({type: SET_LOADING_STATUS, payload: false})
      })
      .catch((err) => {
        dispatch({type: GET_TEACHER_FAILURE, payload: err})
      })
  }
};

export const getTeachers = () => {
  return (dispatch) => {
    axios.get(`/teachers`)
      .then((response) => {
        dispatch({type: GET_TEACHERS, payload: response.data});
      })
      .catch((err) => {
        dispatch({type: GET_TEACHERS_FAILURE, payload: err})
      })
  }
}

export const getActiveTeachers = () => {
  return (dispatch) => {
    axios.get(`/teachers?status=active`)
      .then((response) => {
        dispatch({type: GET_TEACHERS, payload: response.data})
      })
      .catch((err) => {
        dispatch({type: GET_ACTIVE_TEACHERS_FAILURE, payload: {err: true}})
      })
  }
}

export const addTeacher = (teacher) => {
  var teacher_data = new FormData();
  
  // handle file here
  if(teacher['file']) {
    teacher_data.append('file', teacher['file']);
  }
  // handle data
  let teacher_json = JSON.stringify(teacher, null, 2);
  teacher_data.append('teacher', teacher_json);

  axios.post(`/teachers`, teacher_data)
    .then((response) => {
      history.push(`/teachers/${response.data}/dashboard`);
    })
    .catch((err) => {
      console.log(err)
    })
};

export const updateTeacher = (id, field) => {
  axios.put(`/teachers/${id}`, field)
    .then((response) => {
      // history.push("/teachers");
    })
    .catch((err) => {
      console.log(err)
    })
}

export const getTeacherReports = (teacher_id) => {
  return (dispatch) => {
    axios.get(`/reports?teacher_id=${teacher_id}`)
      .then((response) => {
        dispatch({type: GET_REPORTS, payload: response.data})
      })
      .catch((err) => {
        dispatch({type: GET_REPORTS_FAILURE, payload: {err: true}})
      })
  }
}

export const getTeacherCourses = (teacher_id) => {
  return (dispatch) => {
    axios.get(`/courses?teacher_id=${teacher_id}`)
      .then((response) => {
        dispatch({type: GET_COURSES, payload: response.data})
        dispatch({type: SET_LOADING_STATUS, payload: false})
      })
      .catch((err) => {
        dispatch({type: GET_COURSES_FAILURE, payload: {err: true}})
      })
  }
}

export const selectTeacher = (teacher) => {
  return (dispatch) => {
    dispatch({type: SELECT_TEACHER, payload: teacher})
  }
}