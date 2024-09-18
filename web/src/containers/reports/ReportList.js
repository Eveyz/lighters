import React, { useState, useEffect } from "react";
import { Row, Col, Card } from 'react-materialize';

import ReportRow from "./ReportRow";
import Loading from '../../components/Loading';

// import { setLoadingStatus } from '../../actions/status_actions';
// import { selectStudent } from '../../actions/students_actions';
// import { updateBooks } from '../../actions/select_book_actions';
// import { setSuccessStatus } from '../../actions/status_actions';
// import { getTeacherCourses } from '../../actions/teachers_actions';
// import { getReports } from '../../actions/reports_actions';

import axios from "axios";
import history from "../../history";

const ReportList = props => {

  const [isLoading, setIsLoading] = useState(true)
  const [reports, setReports] = useState([])
  const [courses, setCourses] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      let url = `/reports?course_id=${props.course._id}&student_id=${props.student._id}&teacher_id=${props.teacher._id}`;
      let _reports = await axios.get(url)
      setReports(_reports.data)
      let _coruses = await axios.get("/courses?teacher_id=" + props.teacher._id + "&status=active")
      setCourses(_coruses.data)
      setIsLoading(false)
    }
    fetchData()
  }, [])

  const newReport = () => {
    let path = `/teachers/${props.teacher._id}/courses/${props.course._id}/new_report`;
    history.push({
      pathname: path,
      state: {
        student: props.student,
        course: props.course,
        teacher: props.teacher
      }
    })
  }

  if(isLoading) {
    return <Loading />
  }

  const removeFromReportList = (report_id) => {
    var _reports = reports.filter(r => r._id !== report_id)
    _reports = _reports.sort((a, b) => {
      return a.course_date > b.course_date ? -1 : (a.course_date < b.course_date ? 1 : 0)
    })
    setReports(_reports)
  }

  const addToReportList = (report) => {
    var _reports = [...reports, report]
    _reports =_reports.sort((a, b) => {
      return a.course_date > b.course_date ? -1 : (a.course_date < b.course_date ? 1 : 0)
    })
    setReports(_reports)
  }

  let reportList = reports.map((report, idx) => {
    return (
      <ReportRow 
        key={idx}
        idx={idx}
        length={reports.length}
        report={report}
        courses={courses}
        course={props.course}
        student={props.student}
        teacher={props.teacher}
        addToReportList={addToReportList}
        removeFromReportList={removeFromReportList}
      />
    );
  });

  let renderContent = reports.length > 0 ? 
                      <table>
                        <thead>
                          <tr>
                            <th>课程回馈表</th>
                            <th>上课时间</th>
                            <th>学生英文名</th>
                            <th>学生年龄</th>
                            <th>课程</th>
                            <th colSpan="4"></th>
                          </tr>
                        </thead>

                        <tbody>
                          {reportList}
                        </tbody>
                      </table>
                      :
                      <div>
                        <Row>
                          <Col m={12} s={12}>
                            <Card className='white r-box-shadow' textClassName='black-text' title=''>
                            <h5 className="center">当前没有课程回馈表</h5>
                            </Card>
                          </Col>
                        </Row>
                      </div>;

  return (
    <div className="row page-min-height">
      <div className="col m12">
        <button onClick={newReport} className="btn"><i className="material-icons left">add</i>填写新课程回馈表</button>
        <br/>
        {renderContent}
      </div>
    </div>
  )
}

export default ReportList

// class ReportList extends React.Component {
//   constructor(props) {
//     super(props)

//     this.newReport = this.newReport.bind(this);
//   }

//   componentWillMount() {
//     this.props.setLoadingStatus(true)
//     // this.props.setSuccessStatus(false)
//   }

//   componentDidMount() {
//     this.props.getReports(this.props.course_id, this.props.student._id, this.props.teacher_id)
//   }

//   newReport = () => {
//     let path = "/teachers/" + this.props.user_id + "/new_report"
//     this.props.setStudent(this.props.student, path)
//     // this.props.getTeacherCourses(this.props.identity._id)
//   }

//   render() {
//     if(this.props.isLoading) {
//       return <Loading />
//     }

//     let reportList = this.props.reports.map((report, idx) => {
//       return (
//         <ReportRow 
//           key={idx}
//           idx={idx}
//           length={this.props.reports.length}
//           report={report}
//           courses={this.props.courses}
//         />
//       );
//     });

//     let renderContent = this.props.reports.length > 0 ? 
//                         <table>
//                           <thead>
//                             <tr>
//                               <th>课程回馈表</th>
//                               <th>上课时间</th>
//                               <th>学生英文名</th>
//                               <th>学生年龄</th>
//                               <th>课程</th>
//                               <th colSpan="4"></th>
//                             </tr>
//                           </thead>

//                           <tbody>
//                             {reportList}
//                           </tbody>
//                         </table>
//                         :
//                         <div>
//                           <Row>
//                             <Col m={12} s={12}>
//                               <Card className='white r-box-shadow' textClassName='black-text' title=''>
//                               <h5 className="center">当前没有课程回馈表</h5>
//                               </Card>
//                             </Col>
//                           </Row>
//                         </div>;

//     return (
//       <div className="row page-min-height">
//         <div className="col m12">
//           <button onClick={this.newReport} className="btn"><i className="material-icons left">add</i>填写新课程回馈表</button>
//           <br/>
//           {renderContent}
//         </div>
//       </div>
//     )
//   }
// }

// const mapStateToProps = (state) => {
//   return {
//     user_id: state.auth.user.userTokenData.id,
//     identity: state.auth.identityData,
//     isLoading: state.status.loading,
//     course_id: state.coursesData.currentCourse._id,
//     teacher_id: state.auth.identityData._id,
//     student: state.studentsData.currentStudent,
//     reports: state.reportsData.reports.sort((a, b) => {
//       return a.course_date > b.course_date ? -1 : (a.course_date < b.course_date ? 1 : 0)
//     }),
//     courses: state.coursesData.courses.map(course => ({
//         id: course._id,
//         name: course.name
//       })
//     )
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     setSuccessStatus: (status) => {
//       dispatch(setSuccessStatus(status))
//     },
//     setLoadingStatus: (status) => {
//       dispatch(setLoadingStatus(status))
//     },
//     getReports: (course_id, student_id, teacher_id) => {
//       dispatch(getReports(course_id, student_id, teacher_id))
//     },
//     getTeacherCourses: (teacher_id) => {
//       dispatch(getTeacherCourses(teacher_id))
//     },
//     setStudent: (student, path) => {
//       dispatch(selectStudent(student, path))
//     },
//     // updateBooks: (review_books, new_books, future_books) => {
//     //   dispatch(updateBooks(review_books, new_books, future_books))
//     // }
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(ReportList);