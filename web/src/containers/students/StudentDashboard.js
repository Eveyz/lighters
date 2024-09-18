import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'tui-calendar/dist/tui-calendar.min.css';
import axios from 'axios'

import Header from '../../components/layouts/Header';
// import TuiCalendar from '../TuiCalendar';
import StudentCourseList from './StudentCourseList';
// import StudentBookList from './StudentBookList';
import StudentAsset from './StudentAsset';
// import { getStudentReports } from '../../actions/students_actions';
// import { setLoadingStatus } from '../../actions/status_actions'
import Loading from '../../components/Loading'

const StudentDashboard = props => {

  const [isLoading, setIsLoading] = useState(true)
  const [student, setStudent] = useState(null)
  const [reports, setReports] = useState([])

  useEffect(async () => {
    
    var _student = await axios.get(`/students/${props.match.params._id}`)
    var _reports = await axios.get(`/students/${props.match.params._id}/reports`)
    setStudent(_student.data)
    setReports(_reports.data)
    setIsLoading(false)
  }, [])

  if(isLoading) {
    return <Loading />
  }

  let height = {};
  // let mainContent = <div className="card white r-box-shadow">
  //                     <div className="card-content">
  //                       <TuiCalendar isReadOnly={true} />
  //                     </div>
  //                   </div>;
  let mainContent = <StudentCourseList 
                      courses={student.courses} 
                      student_id={student._id}
                      reports={reports} 
                    />;
  
  if(props.location.pathname.includes("assets")) {
    mainContent = <StudentAsset student={student} />
  // } else if (props.location.pathname.includes("books")) {
  //   let _books = [];
  //   student.courses.forEach(course => {
  //     _books = _books.concat(course.books);
  //   });
  //   mainContent = <StudentBookList books={_books} />
  } else {
    height = {"minHeight": "750px"};
  }

  return(
    <div>
      <Header />
      <div className="student-dashboard" style={height}>
        <div className="left-fixed-bar">
          <br/>
          <h5 className="cyan-text" style={{marginLeft: "30px"}}>我的教室</h5>
          <div className="left-bar-menu">
            <Link to={`/students/${student._id}/dashboard`} className={props.location.pathname.includes("dashboard") ? "active" : ""}>
              <i className="material-icons">event_note</i><span>课程</span>
            </Link>
            <Link to={`/students/${student._id}/assets`} className={props.location.pathname.includes("assets") ? "active" : ""}>
              <i className="material-icons">attach_money</i><span>学费记录</span>
            </Link>
            {/* <Link to={`/students/${student._id}/schedule`} className={props.location.pathname.includes("schedule") ? "active" : ""}>
              <i className="material-icons">schedule</i><span>课程表</span>
            </Link> 
            <Link to={`/students/${student._id}/books`} className={props.location.pathname.includes("books") ? "active" : ""}>
              <i className="material-icons">book</i><span>绘本</span>
            </Link> */}
          </div>
        </div>
        <div className="main-content-wrapper">
          <br/>
          <div className="main-content">
            {mainContent}
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentDashboard

// class StudentDashboard extends React.Component {
//   componentDidMount = () => {
//     this.props.setLoadingStatus(true)
//     this.props.getStudentReports(this.props.student._id)
//   }

//   render() {
//     if(this.props.loading) {
//       return <Loading />
//     }

//     let height = {};
//     let mainContent = <div className="card white r-box-shadow">
//                         <div className="card-content">
//                           <TuiCalendar isReadOnly={true} />
//                         </div>
//                       </div>;
    
//     if(this.props.location.pathname.includes("dashboard")) {
//       mainContent = <StudentCourseList 
//                       courses={this.props.student.courses} 
//                       student_id={this.props.student._id}
//                       reports={this.props.reports} 
//                     />;
//     } else if (this.props.location.pathname.includes("assets")) {
//       mainContent = <StudentAsset student_id={this.props.student._id} />
//     } else if (this.props.location.pathname.includes("books")) {
//       let _books = [];
//       this.props.student.courses.forEach(course => {
//         _books = _books.concat(course.books);
//       });
//       mainContent = <StudentBookList books={_books} />
//     } else {
//       height = {"minHeight": "750px"};
//     }

//     return(
//       <div>
//         <Header />
//         <div className="student-dashboard" style={height}>
//           <div className="left-fixed-bar">
//             <br/>
//             <h5 className="cyan-text" style={{marginLeft: "30px"}}>我的教室</h5>
//             <div className="left-bar-menu">
//               <Link to={`/students/${this.props.student._id}/dashboard`} className={this.props.location.pathname.includes("dashboard") ? "active" : ""}>
//                 <i className="material-icons">event_note</i><span>课程</span>
//               </Link>
//               <Link to={`/students/${this.props.student._id}/assets`} className={this.props.location.pathname.includes("assets") ? "active" : ""}>
//                 <i className="material-icons">attach_money</i><span>学费记录</span>
//               </Link>
//               <Link to={`/students/${this.props.student._id}/schedule`} className={this.props.location.pathname.includes("schedule") ? "active" : ""}>
//                 <i className="material-icons">schedule</i><span>课程表</span>
//               </Link>
//               <Link to={`/students/${this.props.student._id}/books`} className={this.props.location.pathname.includes("books") ? "active" : ""}>
//                 <i className="material-icons">book</i><span>绘本</span>
//               </Link>
//             </div>
//           </div>
//           <div className="main-content-wrapper">
//             <br/>
//             <div className="main-content">
//               {mainContent}
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   }
// }

// const mapStateToProps = (state) => {
//   return {
//     user_id: state.auth.user.userTokenData.id,
//     student: state.auth.identityData,
//     reports: state.studentsData.reports,
//     loading: state.reportsData.loading
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     setLoadingStatus: (status) => {
//       dispatch(setLoadingStatus(status))
//     },
//     getStudentReports: (student_id) => {
//       dispatch(getStudentReports(student_id))
//     }
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(StudentDashboard);