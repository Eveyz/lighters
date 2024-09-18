import history from '../history';
import axios from 'axios';
import { GET_STUDENTS, GET_STUDENTS_FAILURE, GET_LOW_BALANCE_STUDENTS, ADD_STUDENT, ADD_STUDENT_FAILURE, UPDATE_STUDENT, UPDATE_STUDENT_FAILURE, GET_STUDENT_FAILURE, SELECT_STUDENT, GET_STUDENT_REPORTS_BEGIN, GET_STUDENT_REPORTS_SUCCESS, GET_STUDENT_REPORTS_FAILURE, SET_LOADING_STATUS } from './constants';
import { setCurrentIdentityData } from './users_actions';

export const getStudents = (query) => {
  const url = query ? `/students/?${query}` : `/students/`
  return (dispatch) => {
    axios.get(url)
      .then((response) => {
        dispatch({type: GET_STUDENTS, payload: response.data})
      })
      .catch((err) => {
        dispatch({type: GET_STUDENTS_FAILURE, payload: err})
      })
  }
};

export const getStudentsWithLowBalance = () => {
  return (dispatch) => {
    axios.get(`/students/low_balance`)
      .then((response) => {
        dispatch({type: GET_STUDENTS, payload: response.data.students})
        dispatch({type: GET_LOW_BALANCE_STUDENTS, payload: response.data.lowBalanceStudents})
      })
      .catch((err) => {
        dispatch({type: GET_STUDENTS_FAILURE, payload: err})
      })
  }
};

export const getStudent = (id) => {
  return (dispatch) => {
    axios.get(`/students/${id}`)
      .then((response) => {
        dispatch(setCurrentIdentityData(response.data));
      })
      .catch((err) => {
        dispatch({type: GET_STUDENT_FAILURE, payload: err})
      })
  }
};

export const getStudentData = (id) => {
  return (dispatch) => {
    axios.get(`/students/${id}`)
      .then((response) => {
        dispatch ({type: SELECT_STUDENT, payload: response.data}).then(() => 
        dispatch({type: SET_LOADING_STATUS, payload: false})
        )
      })
      .catch((err) => {
        dispatch({type: GET_STUDENT_FAILURE, payload: err})
      })
  }
};

export const getStudentReports = (student_id) => {
  return (dispatch) => {
    dispatch({type: GET_STUDENT_REPORTS_BEGIN, payload: null});
    axios.get(`/students/${student_id}/reports`)
    .then((response) => {
      dispatch({type: GET_STUDENT_REPORTS_SUCCESS, payload: response.data})
      dispatch({type: SET_LOADING_STATUS, payload: false})
    })
    .catch((err) => {
      dispatch({type: GET_STUDENT_REPORTS_FAILURE, payload: err})
    })
  }
}

export const createStudent = (student, user_id) => {
  let data = {"expectation": [], "user_id": user_id};
  for (var pair of student.entries()) {
    if(pair[0] === "expectation") {
      data[pair[0]].push(pair[1]);
    } else {
      data[pair[0]] = pair[1];
    }
  }
  return (dispatch) => {
    axios.post(`/students`, data)
      .then((response) => {
        dispatch({type: ADD_STUDENT, payload: response.data});
        // history.push(`/student/${response.data._id}/trial`);
        history.push(`/student/${response.data._id}/dashboard`);
      })
      .catch((err) => {
        dispatch({type: ADD_STUDENT_FAILURE, payload: {err: true}});
      })
  }
}

export const updateStudent = (id, field) => {
  return (dispatch) => {
    axios.put(`/students/${id}`, field)
      .then((response) => {
        dispatch({type: UPDATE_STUDENT, payload: response.data});
      })
      .catch((err) => {
        dispatch({type: UPDATE_STUDENT_FAILURE, payload: {err: true}})
      })
  }
}

export const selectStudent = (student, path) => {
  return (dispatch) => {
    dispatch({type: SELECT_STUDENT, payload: student})
    if(path) {
      history.push(path);
    }
  }
}