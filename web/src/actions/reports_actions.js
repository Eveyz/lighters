import axios from 'axios';
import history from '../history';

import { GET_REPORTS, GET_REPORTS_FAILURE, ADD_REPORT, ADD_REPORT_FAILURE, DELETE_REPORT, DELETE_REPORT_FAILURE, SET_CURRENT_REPORT, UPDATE_REPORT, UPDATE_REPORT_FAILURE, COPY_REPORT, COPY_REPORT_FAILURE, REMOVE_UPLOADED_FILE, SET_LOADING_STATUS, SET_SUCCESS_STATUS } from './constants';

export const getAllReports = () => {
  let url = `/reports`;
  return (dispatch) => {
    axios.get(url).then((response) => {
      dispatch({type: GET_REPORTS, payload: response.data})
      dispatch({type: SET_LOADING_STATUS, payload: false})
    }).catch((err) => {
      dispatch({type: GET_REPORTS_FAILURE, payload: "there was an error while fetching reports"})
    })
  }
}

export const getReports = (course_id, student_id, teacher_id) => {
  let url = `/reports?course_id=${course_id}&student_id=${student_id}&teacher_id=${teacher_id}`;
  return (dispatch) => {
    axios.get(url).then((response) => {
      dispatch({type: GET_REPORTS, payload: response.data})
      dispatch({type: SET_LOADING_STATUS, payload: false})
    }).catch((err) => {
      dispatch({type: GET_REPORTS_FAILURE, payload: "there was an error while fetching reports"})
    })
  }
}

export const addReport = (report, path) => {
  return (dispatch) => {
    // const config = {
    //   headers: {
    //     'content-type': 'multipart/form-data'
    //   }
    // };
    var data = new FormData();
    if(report['audios'] && report['audios'].length > 0) {
      report['audios'].forEach(file => {
        data.append('audios', file);
      });
    }
    let report_json = JSON.stringify(report);
    data.append('report', report_json);
    axios.post(`/reports`, data)
      .then((response) => {
        dispatch({type: ADD_REPORT, payload: response.data})
        dispatch({type: SET_CURRENT_REPORT, payload: response.data})
        dispatch({type: SET_LOADING_STATUS, payload: false})
        history.push(path);
        window.Materialize.toast('成功添加反馈表', 2000, 'green');
      })
      .catch((err) => {
        dispatch({type: ADD_REPORT_FAILURE, payload: "there was an error while adding a new report"})
      })
  }
};

export const copyReport = (current_student_id, course_id, student_id, teacher_id, report_id) => {
  let url = `/reports/copy_report?course_id=${course_id}&student_id=${student_id}&teacher_id=${teacher_id}&report_id=${report_id}`;
  return (dispatch) => {
    axios.get(url).then((response) => {
      if(current_student_id === student_id) {
        dispatch({type: COPY_REPORT, payload: response.data})
      }
      dispatch({type: SET_SUCCESS_STATUS, payload: true})
      dispatch({type: SET_LOADING_STATUS, payload: false})
      // history.push(`/teachers/${response.data.teacher_id}/reports`)
      // window.location.reload()
      window.Materialize.toast('成功复制反馈表', 2000, 'green');
    }).catch((err) => {
      dispatch({type: COPY_REPORT_FAILURE, payload: "there was an error while copying reports"})
    })
  }
}

export const editReport = (report, path) => {
  return (dispatch) => {
    dispatch({type: SET_CURRENT_REPORT, payload: report});
    // dispatch(updateBooks(report.review_books, report.new_books, report.future_books));
    history.push(path);
  }
}

export const viewReport = (report, path) => {
  return (dispatch) => {
    dispatch({type: SET_CURRENT_REPORT, payload: report});
    history.push(path);
    // var win = window.open(path, '_blank');
    // win.focus();
  }
}

export const updateReport = (report_id, report, path) => {
  return (dispatch) => {
    var data = new FormData();
    if(report['audios'] && report['audios'].length > 0) {
      report['audios'].forEach(file => {
        data.append('audios', file);
      });
    }
    let report_json = JSON.stringify(report);
    data.append('report', report_json);
    axios.post(`/reports/${report_id}`, data)
    .then((response) => {
      dispatch({type: UPDATE_REPORT, payload: response.data});
      dispatch({type: SET_LOADING_STATUS, payload: false})
      history.push(path);
      window.Materialize.toast('成功更新反馈表', 1000, 'green');
    })
    .catch((err) => {
      dispatch({type: UPDATE_REPORT_FAILURE, payload: "there are some erros while updating the report"})
    })
  }
}

export const removeUploadedFile = (file, report_id) => {
  let data = {
    file: file,
    report_id: report_id
  };
  return (dispatch) => {
    dispatch({type: REMOVE_UPLOADED_FILE, payload: data});
  }
}

export const deleteReport = (report_id) => {
  return (dispatch) => {
    axios.delete(`/reports/${report_id}`)
      .then((response) => {
        dispatch({type: DELETE_REPORT, payload: report_id})
        window.Materialize.toast('成功删除反馈表', 1000, 'green');
      })
      .catch((err) => {
        dispatch({type: DELETE_REPORT_FAILURE, payload: "there was an error while deleting report"})
      })
  }
}