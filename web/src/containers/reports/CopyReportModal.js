import React, { useEffect } from 'react'
import M from 'materialize-css'

const CopyReportModal = (props) => {

  useEffect(() => {
    var selects = document.querySelectorAll('select')
    M.FormSelect.init(selects, {})
  })

  const modalStyle = {
    minWidth: "50%", 
    minHeight: "200px", 
    backgroundColor: "white", 
    position: "absolute", 
    top: "30%", 
    left: "50%", 
    transform: "translate(-50%, -50%)", 
    padding: "20px 20px"
  }
  return  <div style={modalStyle}>
            <div className="row no-margin">
              <div className="input-field col m12 s12 no-margin">
                <h5 className="no-margin">复制反馈表</h5>
              </div>
            </div>
            <br/>
            <div className="row no-margin">
              <div className="input-field col m6 s12">
                <select
                  ref={props.courseRef}
                  id="course"
                  onChange={props.selectCourse}
                >
                  {
                    props.defaultCourseOption ?
                    props.defaultCourseOption
                    :
                    <option key="default" value="default" disabled>请选择课程</option>
                  }
                  {props.courseOptions}
                </select>
                <label htmlFor="course">请选择课程 <span className="required">*</span></label>
              </div>
              <div className="input-field col m6 s12">
                <select
                  ref={props.studentRef}
                  id="student"
                  disabled={props.disabled}
                  defaultValue="default"
                  onChange={props.selectStudent}
                >
                  <option key="default" value="default" disabled>请选择课程学生</option>
                  {props.studentOptions}
                </select>
                <label htmlFor="student">请选择课程学生 <span className="required">*</span></label>
              </div>
              <div className="row">
                <div className="input-field col m6 s12">
                  <button className="btn cyan" disabled={props.btnDisabled} onClick={props.copyReport}>复制</button>
                </div>
                <div className="input-field col m6 s12">
                  <button className="btn white black-text right" disabled={props.btnDisabled} onClick={props.handleClose}>关闭</button>
                </div>
              </div>
            </div>
          </div>
}

export default CopyReportModal