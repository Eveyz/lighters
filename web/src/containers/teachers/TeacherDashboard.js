import React, { useState, useEffect } from 'react';
import { Row, Col, Card } from 'react-materialize'
import _ from 'lodash';
import axios from 'axios'
import M from 'materialize-css'

import 'tui-calendar/dist/tui-calendar.min.css';
import history from '../../history'
import TeacherCourse from '../../containers/teachers/TeacherCourse';
import TeacherStudentList from '../../containers/teachers/TeacherStudentList';
import TeacherPaychecks from './TeacherPaychecks';
import Header from '../../components/layouts/Header';
import Footer from '../../components/layouts/Footer';
import TeacherCourseBooks from './TeacherCourseBooks';
// import TuiCalendar from '../TuiCalendar';
import Loading from '../../components/Loading'

// import { setLoadingStatus } from '../../actions/status_actions'
// import { getTeacherCourses } from '../../actions/teachers_actions'
// import { selectCourse } from '../../actions/courses_actions'

const TeacherDashboard = props => {

  const [isLoading, setIsLoading] = useState(true)
  const [teacher, setTeacher] = useState(null)

  useEffect(() => {
    axios.get(`/teachers/${props.match.params._id}`)
    .then(res => {
      setTeacher(res.data)
      setIsLoading(false)
      M.AutoInit()
    })
    .catch(err => {
      console.log(err)
    })
  }, [])

  if(isLoading) {
    return <Loading />
  }

  const clickCourse = (course) => e => {
    let path = `/teachers/${props.match.params._id}/courses/${course._id}`
    history.push({
      pathname: path,
      state: { teacher: teacher, course: course }
    })
  }

  if(_.isEmpty(teacher) || teacher.status === "pending") {
    return (
      <div>
        <Header />
        <div className="page-min-height">
          <div className="container">
            <Row>
              <Col m={12} s={12}>
                <Card className='white r-box-shadow' textClassName='black-text' title=''>
                <h5 className="center"><b>您当前处于试课和评定环节, 试课结束之后网站将会开放</b></h5>
                </Card>
              </Col>
            </Row>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  let courses = <Row>
                  <Col m={12} s={12}>
                    <Card className='white r-box-shadow' textClassName='black-text' title=''>
                    <h5 className="center">当前没有课程</h5>
                    </Card>
                  </Col>
                </Row>;
  
  let inactive_courses_widget = <Row>
                                  <Col m={12} s={12}>
                                    <Card className='white r-box-shadow' textClassName='black-text' title=''>
                                    <h5 className="center">当前没有往期课程</h5>
                                    </Card>
                                  </Col>
                                </Row>;
  
  var inactive_courses = []
  var active_courses = []
  if(teacher.courses.length > 0) {
    teacher.courses.forEach(course => {
      course.status === "active" ? active_courses.push(course) : inactive_courses.push(course)
    })
    if(active_courses.length > 0) {
      courses = active_courses.map((course, idx) => {
        return <TeacherCourse key={idx} teacher={teacher} course={course} />
      });
    }
    if(inactive_courses.length > 0) {
      let inactive_courses_list = inactive_courses.map((course, idx) => {
        return <tr key={idx} className="clickable" onClick={(er) => clickCourse(course)}>
                <td>{course.name}</td>
                <td>{course.level}</td>
                <td>{course.count}</td>
              </tr>
      })
      inactive_courses_widget = 
                            <table className="highlight">
                              <thead>
                                <tr>
                                  <th>课程名称</th>
                                  <th>课程级别</th>
                                  <th>反馈表数量</th>
                                </tr>
                              </thead>

                              <tbody>
                                {inactive_courses_list}
                              </tbody>
                            </table>
    }
  };

  let students = <Row>
                  <Col m={12} s={12}>
                    <Card className='white r-box-shadow' textClassName='black-text' title=''>
                    <h5 className="center">当前没有学生</h5>
                    </Card>
                  </Col>
                </Row>;
  let studentsArr = [];
  if(teacher.courses.length > 0) {
    teacher.courses.forEach((c) => {
      studentsArr = studentsArr.concat(c.students);
    });
  }
  if(studentsArr.length > 0) {
    students = <TeacherStudentList students={_.uniqBy(studentsArr, '_id')} />;
  }

  let books = <Row>
                <Col m={12} s={12}>
                  <Card className='white r-box-shadow' textClassName='black-text' title=''>
                  <h5 className="center">当前没有绘本</h5>
                  </Card>
                </Col>
              </Row>;
  if(teacher.courses.length > 0) {
    books = teacher.courses.map((c, index) => {
      return <TeacherCourseBooks key={index} course={c} />
    });
  }

  return (
    <div>
      <Header />
      <div className="page-min-height">
        <div style={{backgroundColor: "#ffca28", padding: "10px 0px 13px 0px"}}>
          <div className="container">
            <div className="row no-margin">
              <div className="col s12">
                <h5 className="white-text" style={{fontWeight: "500"}}>Welcome, {teacher.lastname + "老师"}</h5>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <br/>
          <br/>
          <div className="row">
            <div className="col s12">
              <ul className="tabs">
                <li className="tab col s3"><a href="#courses">课程以及课程反馈表</a></li>
                {/* <li className="tab col s2"><a href="#teacher-calendar-tab">课程表</a></li> */}
                <li className="tab col s2"><a href="#students">学生</a></li>
                <li className="tab col s2"><a href="#books">绘本</a></li>
                <li className="tab col s3"><a href="#paychecks">工资</a></li>
              </ul>
            </div>
            {/* <div id="teacher-calendar-tab" className="col s12 m12">
              <br />
              <div className="card white r-box-shadow">
                <div className="card-content">
                  <TuiCalendar isReadOnly={false} />
                </div>
              </div>
              <br/>
            </div> */}
            <div id="courses" className="col s12">
              <br/>
              <div className="row">
                <div className="col m12">
                  <div className="row no-margin">
                    <h5 className="cyan-text"><b>课程</b></h5>
                  </div>
                  <div className="row">
                    {courses}
                  </div>
                  {
                    true ? "" :
                    <div>
                      <div className="row">
                        <div className="col m12">
                          <h5 className="grey-text"><b>往期课程</b></h5>
                        </div>
                      </div>
                      <div className="row no-margin">
                        {inactive_courses_widget}
                      </div>
                    </div>
                  }
                </div>
              </div>
            </div>
            <div id="students" className="col s12">
              <br/>
              <div className="row">
                <div className="col m12">
                  {students}
                </div>
              </div>
            </div>
            <div id="books" className="col s12">
              <br/>
              <div className="row">
                <div className="col m12">
                  {books}
                </div>
              </div>
            </div>
            <div id="paychecks" className="col s12">
              <br/>
              <div className="row">
                <div className="col m12">
                  <TeacherPaychecks teacher_id={teacher._id} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default TeacherDashboard

// class TeacherDashboard extends React.Component {

//   constructor(props) {
//     super(props)

//     this.clickCourse = this.clickCourse.bind(this)
//   }

//   clickCourse = (course) => e => {
//     let path = `/teachers/${this.props.user_id}/course_manager`
//     this.props.selectCourse(course, path);
//   }

//   componentDidMount() {
//     this.props.setLoadingStatus(true)
//     this.props.getTeacherCourses(this.props.teacher._id)
//   }

//   render() {
//     if(this.props.isLoading) {
//       return <Loading />
//     }

//     if(_.isEmpty(this.props.teacher) || this.props.teacher.status === "pending") {
//       return (
//         <div>
//           <Header />
//           <div className="page-min-height">
//             <div style={{backgroundColor: "#ffca28", padding: "10px 0px 13px 0px"}}>
//               <div className="container">
//                 <div className="row no-margin">
//                   <div className="col s12">
//                     <h5 className="white-text" style={{fontWeight: "500"}}>Welcome, {this.props.teacher.lastname + "老师"}</h5>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="container">
//               <Row>
//                 <Col m={12} s={12}>
//                   <Card className='white r-box-shadow' textClassName='black-text' title=''>
//                   <h5 className="center"><b>当前处于试课和评定环节, 试课结束之后网站将会开放</b></h5>
//                   </Card>
//                 </Col>
//               </Row>
//             </div>
//           </div>
//           <Footer />
//         </div>
//       )
//     }

//     let courses = <Row>
//                     <Col m={12} s={12}>
//                       <Card className='white r-box-shadow' textClassName='black-text' title=''>
//                       <h5 className="center">当前没有课程</h5>
//                       </Card>
//                     </Col>
//                   </Row>;
    
//     let inactive_courses_widget = <Row>
//                                     <Col m={12} s={12}>
//                                       <Card className='white r-box-shadow' textClassName='black-text' title=''>
//                                       <h5 className="center">当前没有往期课程</h5>
//                                       </Card>
//                                     </Col>
//                                   </Row>;
    
//     var inactive_courses = []
//     var active_courses = []
//     if(this.props.courses.length > 0) {
//       this.props.courses.forEach(course => {
//         course.status === "active" ? active_courses.push(course) : inactive_courses.push(course)
//       })
//       if(active_courses.length > 0) {
//         courses = active_courses.map((course, idx) => {
//           return <TeacherCourse key={idx} user_id={this.props.user_id} course={course} />
//         });
//       }
//       if(inactive_courses.length > 0) {
//         let inactive_courses_list = inactive_courses.map((course, idx) => {
//           return <tr key={idx} className="clickable" onClick={this.clickCourse(course)}>
//                   <td>{course.name}</td>
//                   <td>{course.level}</td>
//                   <td>{course.count}</td>
//                 </tr>
//         })
//         inactive_courses_widget = 
//                               <table className="highlight">
//                                 <thead>
//                                   <tr>
//                                     <th>课程名称</th>
//                                     <th>课程级别</th>
//                                     <th>反馈表数量</th>
//                                   </tr>
//                                 </thead>

//                                 <tbody>
//                                   {inactive_courses_list}
//                                 </tbody>
//                               </table>
//       }
//     };

//     let students = <Row>
//                     <Col m={12} s={12}>
//                       <Card className='white r-box-shadow' textClassName='black-text' title=''>
//                       <h5 className="center">当前没有学生</h5>
//                       </Card>
//                     </Col>
//                   </Row>;
//     let studentsArr = [];
//     if(this.props.courses.length > 0) {
//       this.props.courses.forEach((c) => {
//         studentsArr = studentsArr.concat(c.students);
//       });
//     }
//     if(studentsArr.length > 0) {
//       students = <TeacherStudentList students={_.uniqBy(studentsArr, '_id')} />;
//     }

//     let books = <Row>
//                   <Col m={12} s={12}>
//                     <Card className='white r-box-shadow' textClassName='black-text' title=''>
//                     <h5 className="center">当前没有绘本</h5>
//                     </Card>
//                   </Col>
//                 </Row>;
//     if(this.props.courses.length > 0) {
//       books = this.props.courses.map((c, index) => {
//         return <TeacherCourseBooks key={index} course={c} />
//       });
//     }

//     return(
//       <div>
//         <Header />
//         <div className="page-min-height">
//           <div style={{backgroundColor: "#ffca28", padding: "10px 0px 13px 0px"}}>
//             <div className="container">
//               <div className="row no-margin">
//                 <div className="col s12">
//                   <h5 className="white-text" style={{fontWeight: "500"}}>Welcome, {this.props.teacher.lastname + "老师"}</h5>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="container">
//             <br/>
//             <br/>
//             <div className="row">
//               <div className="col s12">
//                 <ul className="tabs">
//                   <li className="tab col s3"><a href="#courses">课程以及课程反馈表</a></li>
//                   <li className="tab col s2"><a href="#teacher-calendar-tab">课程表</a></li>
//                   <li className="tab col s2"><a href="#students">学生</a></li>
//                   <li className="tab col s2"><a href="#books">绘本</a></li>
//                   <li className="tab col s3"><a href="#paychecks">工资</a></li>
//                 </ul>
//               </div>
//               <div id="teacher-calendar-tab" className="col s12 m12">
//                 <br />
//                 <div className="card white r-box-shadow">
//                   <div className="card-content">
//                     <TuiCalendar isReadOnly={false} />
//                   </div>
//                 </div>
//                 <br/>
//               </div>
//               <div id="courses" className="col s12">
//                 <br/>
//                 <div className="row">
//                   <div className="col m12">
//                     <div className="row no-margin">
//                       <h5 className="cyan-text"><b>课程</b></h5>
//                     </div>
//                     <div className="row">
//                       {courses}
//                     </div>
//                     {
//                       true ? "" :
//                       <div>
//                         <div className="row">
//                           <div className="col m12">
//                             <h5 className="grey-text"><b>往期课程</b></h5>
//                           </div>
//                         </div>
//                         <div className="row no-margin">
//                           {inactive_courses_widget}
//                         </div>
//                       </div>
//                     }
//                   </div>
//                 </div>
//               </div>
//               <div id="students" className="col s12">
//                 <br/>
//                 <div className="row">
//                   <div className="col m12">
//                     {students}
//                   </div>
//                 </div>
//               </div>
//               <div id="books" className="col s12">
//                 <br/>
//                 <div className="row">
//                   <div className="col m12">
//                     {books}
//                   </div>
//                 </div>
//               </div>
//               <div id="paychecks" className="col s12">
//                 <br/>
//                 <div className="row">
//                   <div className="col m12">
//                     <TeacherPaychecks />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <Footer />
//       </div>
//     )
//   }
// }

// const mapStateToProps = (state) => {
//   return {
//     user_id: state.auth.user.userTokenData.id,
//     teacher: state.auth.identityData,
//     courses: state.coursesData.courses,
//     activeTab: state.mode.value,
//     isLoading: state.reportsData.loading
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     setLoadingStatus: (status) => {
//       dispatch(setLoadingStatus(status))
//     },
//     getTeacherCourses: (teacher_id) => {
//       dispatch(getTeacherCourses(teacher_id))
//     },
//     selectCourse: (course, path) => {
//       dispatch(selectCourse(course, path))
//     }
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(TeacherDashboard);