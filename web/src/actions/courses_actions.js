import axios from 'axios';
import history from '../history';

// import { groupBooks } from '../ultis';
import { GET_COURSES, GET_COURSES_FAILURE, DELETE_COURSE, SELECT_COURSE, COURSE_DELETE_STUDENT, SWITCH_MODE, COURSE_POST_STUDENT, COURSE_ADD_BOOK, COURSE_REMOVE_BOOK  } from './constants';

export const selectCourse = (course, path) => {
  return (dispatch) => {
    dispatch({type: SELECT_COURSE, payload: course});
    // if(store.getState().auth.user.userTokenData.identity !== "admin") {
    //   dispatch({type: GROUPED_BOOKS, payload: groupBooks(course.books)})
    // }
    if(path) {
      history.push(path)
    }
  }
}

export const getCourses = () => {
  return function(dispatch){
    axios.get("/courses")
      .then(function(response) {
        dispatch({type: GET_COURSES, payload: response.data})
      })
      .catch(function(err){
        dispatch({type: GET_COURSES_FAILURE, payload: err})
        history.push('/')
      })
  }
};

export const addCourse = (course) => {
  axios.post("/courses", course)
    .then(function(response){
      history.push("/admin/courses/all");
      window.Materialize.toast('成功添加课程', 1000, 'green');
    })
    .catch(function(err){
      console.log(err)
    })
};

export const editCourse = (course) => {
  return (dispatch) => {
    dispatch(selectCourse(course));
    history.push(`/courses/${course._id}/edit_course`)
  }
}

export const updateCourse = (course_id, field, back) => {
  axios.put(`/courses/${course_id}`, field)
    .then((response) => {
      if(back) {
        history.push('/admin/courses/all')
      } else {
        window.location.reload()
      }
      window.Materialize.toast('成功更新课程', 1000, 'green')
    })
    .catch((err) => {
      console.log(err)
    })
};

export const deleteCourse = id => {
  return (dispatch) => {
    return axios.delete("/courses/" + id)
      .then(response => {
        dispatch({type: DELETE_COURSE, payload: id})
        // history.push("/admin/courses/all");
      })
      .catch(err => {
        if(err) throw(err);
      })
  }
};

export const addStudent = (course) => {
  return (dispatch) => {
    dispatch(selectCourse(course));
    history.push(`/courses/${course._id}/add_student`);
  }
};

export const postStudent = (courseID, studentID) => {
  return dispatch => {
    return axios.post(`/courses/${courseID}/post_student`, studentID)
      .then(response => {
        dispatch({type: COURSE_POST_STUDENT, payload: response.data});
      })
      .catch(err => {
        if(err) throw(err);
      });
  }
}

export const deleteStudent = (id, studentID) => {
  return dispatch => {
    return axios.put(`/courses/${id}/delete_student`, {"studentID": studentID})
      .then(response => {
        dispatch({type: COURSE_DELETE_STUDENT, payload: response.data});
      })
      .catch(err => {
        if(err) throw(err);
      });
  }
};

export const switchMode = (mode) => {
  return dispatch => {
    dispatch({type: SWITCH_MODE, payload: mode})
  }
}

export const addBook = (course) => {
  return (dispatch) => {
    dispatch(selectCourse(course));
    history.push(`/courses/${course._id}/add_book`);
  }
};

export const postBook = (id, bookID) => {
  return dispatch => {
    return axios.post(`/courses/${id}/post_book`, {"bookID": bookID})
      .then(response => {
        dispatch({type: COURSE_ADD_BOOK, payload: response.data});
      })
      .catch(err => {
        if(err) throw(err);
      });
  }
};

export const removeBook = (id, bookID) => {
  return dispatch => {
    return axios.put(`/courses/${id}/delete_book`, {"bookID": bookID})
      .then(response => {
        dispatch({type: COURSE_REMOVE_BOOK, payload: response.data});
      })
      .catch(err => {
        if(err) throw(err);
      });
  }
};