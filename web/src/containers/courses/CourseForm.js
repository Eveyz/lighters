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
      addCourse(course);
    } else if (props.type === "EDIT") {
      updateCourse(courseID, course, true);
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
  if(props.type === "EDIT" && props.course !== {}) {
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
              <Button onClick={handleSubmit}>提交</Button>
            </div>
          </div>
        </Col>
      }
    </Row>
  )
}

export default CourseForm

// class CourseForm extends React.Component {
//   constructor(props) {
//     super(props);
    
//     this.nameInput = React.createRef();
//     this.typeInput = React.createRef();
//     this.levelInput = React.createRef();
//     // this.capacityInput = React.createRef();
//     // this.hoursInput = React.createRef();
//     this.courseRate = React.createRef();
//     this.timeInput = React.createRef();
//     this.teachersSelect = React.createRef();

//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   initMaterilize() {
//     var timePicker = this.timeInput.current;
//     var selectElem = this.teachersSelect.current;
//     M.FormSelect.init(selectElem, {});
//     M.Timepicker.init(timePicker, {});
//     M.AutoInit();
//     M.updateTextFields();
//   }

//   componentWillMount() {
//     this.initMaterilize()
//     this.props.getActiveTeachers()
//   }

//   componentDidMount() {
//     this.initMaterilize()
//   }

//   componentDidUpdate() {
//     this.initMaterilize()
//   }

//   handleSubmit(e) {
//     e.preventDefault();
//     let courseID = this.props.course._id;
//     let teacher = this.teachersSelect.current.value !== "default" ? this.teachersSelect.current.value : null;
//     const course = {
//       name: this.nameInput.current.value,
//       level: this.levelInput.current.value,
//       type: this.typeInput.current.value,
//       // capacity: this.capacityInput.current.value,
//       // course_hours: this.hoursInput.current.value,
//       course_rate: this.courseRate.current.value,
//       // timeInput: this.timeInput.current.value,
//       teachers: [teacher]
//     };

//     if(this.props.type === "ADD") {
//       this.props.addCourse(course);
//     } else if (this.props.type === "EDIT") {
//       this.props.updateCourse(courseID, course);
//     }
//   }

//   render() {
//     let disabled = true;
//     let defaultOption = <option value="default" disabled>目前没有老师可以选择</option>;
//     if(this.props.teachers.length > 0) {
//       disabled = false;
//       defaultOption = <option value="default" disabled>选择教师</option>;
//     }
//     let options = this.props.teachers.map((teacher, index) => {
//       return (
//         <Option key={index} id={teacher._id} value={teacher.lastname + teacher.firstname} />
//       );
//     });

//     let nameVal = "";
//     let levelVal = "";
//     let typeVal = "";
//     // let capacityVal = "";
//     // let coursehoursVal = "";
//     let courseRateVal = "";
//     // let timeInputVal = "";
//     let teacherVal = "default";
//     if(this.props.type === "EDIT" && this.props.currentCourse !== {}) {
//       nameVal = this.props.currentCourse.name;
//       typeVal = this.props.currentCourse.type;
//       levelVal = this.props.currentCourse.level;
//       // capacityVal = this.props.currentCourse.capacity;
//       courseRateVal = this.props.currentCourse.course_rate;
//       // coursehoursVal = this.props.currentCourse.course_hours;

//       let defaultTeacher = this.props.currentCourse.teachers[0]
//       teacherVal = defaultTeacher ? defaultTeacher._id : "";
//     }

//     let selectEle = <div className="input-field col s12">
//                       <select 
//                         defaultValue={teacherVal} 
//                         ref={this.teachersSelect} 
//                         disabled={disabled}
//                       >
//                         {defaultOption}
//                         {options}
//                       </select>
//                       <label>选择教师</label>
//                     </div>

//     let courseTypes = CLASS_TYPE.map((cla, idx) => {
//       return <option key={idx} value={cla}>{cla}</option>;
//     });

//     let courseLevels = CLASS_LEVEL.map((cla, idx) => {
//       return <option key={idx} value={cla}>{cla}</option>;
//     });

//     return (
//       <Row>
//         <Col s={12} m={10} offset="m1">
//           <br/>
//           <div className="card">
//             <div className="card-content" style={{padding: "50px"}}>
//               <Row>
//                 <div className="col input-field s12">
//                   <input type="text" defaultValue={nameVal} ref={this.nameInput} id="name" />
//                   <label htmlFor="name">课程名称</label>
//                 </div>
//               </Row>
//               <Row>
//                 <div className="input-field col s12 m12">
//                   <select
//                     ref={this.levelInput}
//                     defaultValue={levelVal}
//                     id="level"
//                   >
//                     <option key="default" value="default" disabled>请选择课程评级</option>
//                     {courseLevels}
//                   </select>
//                   <label htmlFor="level">课程评级 <span className="required">*</span></label>
//                 </div>
//               </Row>
//               <Row>
//                 <div className="col input-field s12">
//                   <input type="number" defaultValue={courseRateVal} ref={this.courseRate} id="courseRate" />
//                   <label htmlFor="courseRate">课时费(元/课时/人) <span className="required">*</span></label>
//                 </div>
//               </Row>
//               <Row>
//                 <div className="input-field col s12 m12">
//                   <select
//                     ref={this.typeInput}
//                     defaultValue={typeVal}
//                     id="type"
//                   >
//                     <option key="default" value="default" disabled>请选择课程类型</option>
//                     {courseTypes}
//                   </select>
//                   <label htmlFor="type">课程类型 <span className="required">*</span></label>
//                 </div>
//               </Row>
//               {/*
//               <Row>
//                 <div className="col input-field s12">
//                   <input type="number" defaultValue={capacityVal} ref={this.capacityInput} id="capacity" />
//                   <label htmlFor="capacity">课程容量</label>
//                 </div>
//               </Row>
//               <Row>
//                 <div className="col input-field s12">
//                   <input type="number" defaultValue={coursehoursVal} ref={this.hoursInput} id="hours" />
//                   <label htmlFor="hours">课时</label>
//                 </div>
//               </Row>
//               <Row>
//                 <div className="col input-field s12">
//                   <input type="text" defaultValue={timeInputVal} className="timepicker" ref={this.timeInput} id="timeInput" />
//                   <label htmlFor="timeInput">课程时间</label>
//                 </div>
//               </Row> */}
//               <Row>
//                 {selectEle}
//               </Row>
//               <Button onClick={this.handleSubmit}>提交</Button>
//             </div>
//           </div>
//         </Col>
//       </Row>
//     )
//   }
// }

// const mapStateToProps = state => {
//   // this.props.search
//   return {
//     currentCourse: state.coursesData.currentCourse,
//     courses: state.coursesData.courses,
//     teachers: state.teachersData.teachers,
//     students: state.studentsData.students
//   };
// }

// // Any thing returned from this function will end up as props on the BookList component
// const mapDispatchToProps = dispatch => {
//   // Whenever search is called, the result should be passed to all reducers
//   return {
//     getActiveTeachers: () => {
//       dispatch(getActiveTeachers())
//     },
//     addCourse: (course) => {
//       dispatch(addCourse(course))
//     },
//     updateCourse: (courseID, course) => {
//       dispatch(updateCourse(courseID, course))
//     }
//   }; // this.props.doSearch will become the result of headSearch
// }

// export default connect(mapStateToProps, mapDispatchToProps)(CourseForm);