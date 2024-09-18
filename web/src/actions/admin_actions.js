import axios from 'axios';
import history from '../history';
import { ADMIN_CREATE_TEACHER, ADMIN_UPDATE_TEACHER, ADMIN_CREATE_STUDENT, ADMIN_UPDATE_STUDENT } from './constants';

export const createTeacher = (teacher) => {
  return (dispatch) => {
    // const randomstring = Math.random().toString(36).slice(-8);
    const data = {
      teacher: teacher
    }
    axios.post(`/admin/createTeacher`, data)
      .then((response) => {
        dispatch({type: ADMIN_CREATE_TEACHER, payload: response.data});
        history.push(`/admin/teachers/all`);
        window.Materialize.toast('成功添加', 1000, 'green');
      })
      .catch((err) => {
        console.log(err);
      })
  }
};

export const updateTeacher = (id, teacher) => {
  return (dispatch) => {
    // const randomstring = Math.random().toString(36).slice(-8);
    const data = {
      _id: id,
      teacher: teacher
    }
    axios.put(`/admin/updateTeacher`, data)
      .then((response) => {
        dispatch({type: ADMIN_UPDATE_TEACHER, payload: response.data});
        history.push(`/admin/teachers/all`);
      })
      .catch((err) => {
        console.log(err);
      })
  }
};

export const createStudent = (student) => {
  return (dispatch) => {
    // const randomstring = Math.random().toString(36).slice(-8);
    const data = {
      student: student
    }
    axios.post(`/admin/createStudent`, data)
      .then((response) => {
        dispatch({type: ADMIN_CREATE_STUDENT, payload: response.data});
        history.push(`/admin/students/all`);
      })
      .catch((err) => {
        console.log(err);
      })
  }
};

export const updateStudent = (id, student) => {
  return (dispatch) => {
    // const randomstring = Math.random().toString(36).slice(-8);
    const data = {
      _id: id,
      student: student
    }
    axios.put(`/admin/updateStudent`, data)
      .then((response) => {
        dispatch({type: ADMIN_UPDATE_STUDENT, payload: response.data});
        history.push(`/admin/students/all`);
      })
      .catch((err) => {
        console.log(err);
      })
  }
};