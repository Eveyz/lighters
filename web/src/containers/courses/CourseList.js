// import React from 'react';
// import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
// import M from 'materialize-css';

// import { getCourses, addCourse, deleteCourse } from "../../actions/courses_actions";
// import { setLoadingStatus } from "../../actions/status_actions";
// import { getBooks } from '../../actions/books_actions';
// import '../../css/App.css';
// import Course from './Course';
// import Header from '../../components/layouts/Header';
// import Footer from '../../components/layouts/Footer';
// import Breadcrumb from '../../components/layouts/Breadcrumb';

// class CourseList extends React.Component {

//   constructor(props) {
//     super(props);

//     this.active = "active";
//   }

//   componentWillMount() {
//     this.props.setLoadingStatus(true);
//     this.props.fetchCoures()
//     this.props.getBooks()
//   }

//   componentDidMount() {
//     M.AutoInit();
//   }

//   render() {
//     var activeCourses = [], inactiveCourses = [];
//     var activeCoursesList, inactiveCoursesList;

//     this.props.courses.forEach((course) => {
//       if(course.status === "active") activeCourses.push(course);
//       else if(course.status === "inactive") inactiveCourses.push(course);
//     });
        
//     if(activeCourses.length > 0) {
//       activeCoursesList = activeCourses.map((course, index) => {
//         return (
//           <Course key={index} id={course._id} course={course} />
//         );
//       });
//     } else {
//       activeCoursesList =  <div className="col m12">
//                       <div className="card white r-box-shadow">
//                         <div className="card-content">
//                           <h4 className="center">当前没有课程，请添加</h4>
//                         </div>
//                       </div>
//                     </div>;
//     }

//     if(inactiveCourses.length > 0) {
//       inactiveCoursesList = inactiveCourses.map((course, index) => {
//         return (
//           <Course key={index} id={course._id} course={course} />
//         );
//       });
//     } else {
//       inactiveCoursesList =  <div className="col m12">
//                                 <div className="card white r-box-shadow">
//                                   <div className="card-content">
//                                     <h4 className="center">当前没有过期课程</h4>
//                                   </div>
//                                 </div>
//                               </div>;
//     }

//     let active = this.active === "active" ? "active" : "";
//     let inactive = this.active === "active" ? "" : "active";

//     return (
//       <div>
//         <Header />
//         <div className="bg-light-grey page-min-height">
//           <Breadcrumb action="courses"/>

//           <div className="container">
//             <br/>
//             <div className="row">
//               <div className="col m12">
//                 <Link to="/courses/add_course" className="btn"><i className="material-icons left">add</i>添加课程</Link>
//               </div>
//             </div>
//             <div className="row">
//               <div className="col m3">
//                 <h6 style={{color: "rgba(0,0,0,.6)", fontWeight: "700"}}>所有课程</h6>
//               </div>
//             </div>

//             <div className="row">
//               <div className="col s12">
//                 <ul className="tabs">
//                   <li className="tab col s6 m6"><a className={active} href="#active" onClick={(e) => this.active = "active"}>活跃课程({activeCourses.length})</a></li>
//                   <li className="tab col s6 m6"><a onClick={(e) => this.active = "inactive"} className={inactive} href="#inactive">过期课程({inactiveCourses.length})</a></li>
//                 </ul>
//               </div>
//               <div id="active" className="col s12">{activeCoursesList}</div>
//               <div id="inactive" className="col s12">{inactiveCoursesList}</div>
//             </div>

//           </div>
//         </div>
//         <Footer/>
//       </div>
//     )
//   }
// }

// const mapStateToProps = state => {
//   // this.props.search
//   return {
//     courses: state.coursesData.courses
//   };
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     setLoadingStatus: (status) => {
//       dispatch(setLoadingStatus(status))
//     },
//     getBooks: () => dispatch(getBooks()),
//     fetchCoures: () => {
//       dispatch(getCourses())
//     },
//     addCourse: () => dispatch(addCourse()),
//     deleteCourse: () => dispatch(deleteCourse())
//   };
// }
