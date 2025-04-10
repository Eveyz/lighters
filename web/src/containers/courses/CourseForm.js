import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios'

import { Row, Col, Button } from 'react-materialize';
import M from 'materialize-css';
import { CLASS_TYPE, CLASS_LEVEL } from '../../ultis';
import '../../css/App.css';
import { addCourse, updateCourse } from "../../actions/courses_actions";
import Option from '../../components/Option';
import Loading from '../../components/Loading'

const CourseForm = props => {

  const [teachers, setActiveTeachers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const nameInput = useRef(null)
  const typeInput = useRef(null)
  const levelInput = useRef(null)
  const courseRate = useRef(null)
  const timeInput = useRef(null)
  const teachersSelect = useRef(null)

  const initMaterilize = () => {
    var timePicker = timeInput.current;
    var selectElem = teachersSelect.current;
    M.FormSelect.init(selectElem, {});
    M.Timepicker.init(timePicker, {});
    M.AutoInit();
    M.updateTextFields();
  }

  useEffect(() => {
    axios.get(`/teachers?status=active`)
    .then((response) => {
        setActiveTeachers(response.data)
        setIsLoading(false)
        initMaterilize()
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Prevent multiple submissions
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
    let courseID = props.course ? props.course._id : null;
    let teacher = teachersSelect.current.value !== "default" ? teachersSelect.current.value : null;
    const course = {
      name: nameInput.current.value,
      level: levelInput.current.value,
      type: typeInput.current.value,
      // capacity: capacityInput.current.value,
      // course_hours: hoursInput.current.value,
      course_rate: courseRate.current.value,
      // timeInput: timeInput.current.value,
      teachers: teacher ? [teacher] : []
    };

    if(props.type === "ADD") {
      addCourse(course)
      setIsSubmitting(false);
    } else if (props.type === "EDIT") {
      updateCourse(courseID, course, true)
      setIsSubmitting(false);
    }
  }

  let disabled = true;
  let defaultOption = <option value="default" disabled>目前没有老师可以选择</option>;
  if(teachers.length > 0) {
    disabled = false;
    defaultOption = <option value="default" disabled>选择教师</option>;
  }
  let options = teachers.map((teacher, index) => {
    return (
      <Option key={index} id={teacher._id} value={teacher.lastname + teacher.firstname} />
    );
  });

  let nameVal = "";
  let levelVal = "";
  let typeVal = "";
  // let capacityVal = "";
  // let coursehoursVal = "";
  let courseRateVal = "";
  // let timeInputVal = "";
  let teacherVal = "default";
  if(props.type === "EDIT" && props.course && Object.keys(props.course).length > 0) {
    nameVal = props.course.name;
    typeVal = props.course.type;
    levelVal = props.course.level;
    // capacityVal = props.course.capacity;
    courseRateVal = props.course.course_rate;
    // coursehoursVal = props.course.course_hours;

    let defaultTeacher = props.course.teachers[0]
    teacherVal = defaultTeacher ? defaultTeacher._id : "";
  }

  let selectEle = <div className="input-field col s12">
                    <select 
                      defaultValue={teacherVal} 
                      ref={teachersSelect} 
                      disabled={disabled}
                    >
                      {defaultOption}
                      {options}
                    </select>
                    <label>选择教师</label>
                  </div>

  let courseTypes = CLASS_TYPE.map((cla, idx) => {
    return <option key={idx} value={cla}>{cla}</option>;
  });

  let courseLevels = CLASS_LEVEL.map((cla, idx) => {
    return <option key={idx} value={cla}>{cla}</option>;
  });

  return (
    <Row>
      {
        isLoading ?
        <Loading /> :
        <Col s={12} m={10} offset="m1">
          <br/>
          <div className="card">
            <div className="card-content" style={{padding: "50px"}}>
              <Row>
                <div className="col input-field s12">
                  <input type="text" defaultValue={nameVal} ref={nameInput} id="name" />
                  <label htmlFor="name">课程名称</label>
                </div>
              </Row>
              <Row>
                <div className="input-field col s12 m12">
                  <select
                    ref={levelInput}
                    defaultValue={levelVal}
                    id="level"
                  >
                    <option key="default" value="default" disabled>请选择课程评级</option>
                    {courseLevels}
                  </select>
                  <label htmlFor="level">课程评级 <span className="required">*</span></label>
                </div>
              </Row>
              <Row>
                <div className="col input-field s12">
                  <input type="number" defaultValue={courseRateVal} ref={courseRate} id="courseRate" />
                  <label htmlFor="courseRate">课时费(元/课时/人) <span className="required">*</span></label>
                </div>
              </Row>
              <Row>
                <div className="input-field col s12 m12">
                  <select
                    ref={typeInput}
                    defaultValue={typeVal}
                    id="type"
                  >
                    <option key="default" value="default" disabled>请选择课程类型</option>
                    {courseTypes}
                  </select>
                  <label htmlFor="type">课程类型 <span className="required">*</span></label>
                </div>
              </Row>
              <Row>
                {selectEle}
              </Row>
              <Button 
                onClick={handleSubmit} 
                disabled={isSubmitting}
              >
                {isSubmitting ? '提交中...' : '提交'}
              </Button>
            </div>
          </div>
        </Col>
      }
    </Row>
  )
}

export default CourseForm