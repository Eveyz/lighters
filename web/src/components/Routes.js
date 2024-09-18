import React, { useEffect, useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios'
import setAuthToken from '../helper/setAuthToken'
import {AppContext} from '../AppContext'

import '../css/App.css';
import '../css/flash.css';
import '../css/richtext-editor.css';

import { AdminRoute, TeacherRoute, StudentRoute, PrivateRoute } from './auth/requireAuth';

// Components
import asyncComponent from './AsyncComponent';

const Home = asyncComponent(() => import("./layouts/Home"));
const CourseHierarchy = asyncComponent(() => import('./mainpages/courseHierarchy'));
const LoginForm = asyncComponent(() => import('../containers/users/LoginForm'));
const SignupForm = asyncComponent(() => import('../containers/users/SignupForm'));
const ForgetPassword = asyncComponent(() => import('../containers/users/ForgetPassword'));
const ResetPassword = asyncComponent(() => import('../containers/users/ResetPassword'));
const Dashboard = asyncComponent(() => import('../containers/users/admin/dashboard'));
// const BookListContainer = asyncComponent(() => import('../containers/books/BookListContainer'));
// const NewBook = asyncComponent(() => import('../components/books/NewBook'));
// const EditBook = asyncComponent(() => import('../components/books/EditBook'));
// const ViewBook = asyncComponent(() => import('../components/books/ViewBook'));
const TableCourseList = asyncComponent(() => import('../containers/courses/TableCourseList'));
const AddCourse = asyncComponent(() => import('../containers/courses/AddCourse'));
const EditCourse = asyncComponent(() => import('../containers/courses/EditCourse'));
const CourseAddStudent = asyncComponent(() => import('../containers/courses/AddStudent'));
// const CourseAddBook = asyncComponent(() => import('../containers/courses/AddBook'));
const StudentList = asyncComponent(() => import('../containers/students/StudentList'));
const NewStudent = asyncComponent(() => import('../containers/students/NewStudent'));
const TeacherList = asyncComponent(() => import('../containers/teachers/TeacherList'));
const NewTeacher = asyncComponent(() => import('../containers/teachers/NewTeacher'));
const TeacherDashboard = asyncComponent(() => import('../containers/teachers/TeacherDashboard'));
const ShowTeacher = asyncComponent(() => import('../containers/teachers/ShowTeacher'));
const TeacherProfile = asyncComponent(() => import('./teachers/TeacherProfile'));
const TeacherCourseManager = asyncComponent(() => import('../containers/teachers/TeacherCourseManager'));
const ReportFormContainer = asyncComponent(() => import('../containers/reports/ReportFormContainer'));
const AllReports = asyncComponent(() => import('../containers/reports/AllReports'));
const ViewReport = asyncComponent(() => import('../containers/reports/ViewReport'));
const StudentDashboard = asyncComponent(() => import('../containers/students/StudentDashboard'));
const StudentProfile = asyncComponent(() => import('./students/StudentProfile'));
const ShowStudent = asyncComponent(() => import('../containers/students/ShowStudent'));
const AssetsDashboard = asyncComponent(() => import('../containers/assets/AssetsDashboard'));
const AdminTeacherNew = asyncComponent(() => import('../containers/users/admin/teachers/AdminTeacherNew'));
const AdminTeacherEdit = asyncComponent(() => import('../containers/users/admin/teachers/AdminTeacherEdit'));
const AdminStudentNew = asyncComponent(() => import('../containers/users/admin/students/AdminStudentNew'));
const AdminStudentEdit = asyncComponent(() => import('../containers/users/admin/students/AdminStudentEdit'));
const ActivateUser = asyncComponent(() => import('../containers/users/activate/ActivateUser'));
const ViewEvaluation = asyncComponent(() => import('../components/evaluations/Evaluation'));
const Notification = asyncComponent(() => import('../containers/notifications/notification'));

const Routes = props => {

  // eslint-disable-next-line
  const [context, setContext] = useContext(AppContext)
  
  useEffect(() => {
    if(!axios.defaults.headers.common['authorization']) {
      let token = localStorage.getItem("jwtToken");
      if(token) {
        setAuthToken(token)
      }
    }
    // console.log(context)
  }, [])

  return(
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/advantage" component={CourseHierarchy} />
      <Route exact path="/teachers/new" component={NewTeacher} />
      <Route exact path="/students/new" component={NewStudent} />
      <Route exact path="/login" component={LoginForm} />
      <Route exact path="/signup" component={SignupForm} />
      <Route exact path="/password/reset" component={ForgetPassword} />
      <Route exact path="/users/reset_password" component={ResetPassword} />
      {/* <Route exact path="/teachers/me" component={BookListContainer} /> */}
      {/* <Route exact path="/students/me" component={BookListContainer} /> */}
      <PrivateRoute exact path="/users/:_id/activate" context={context} component={ActivateUser} />
      {/* <PrivateRoute exact path="/books/:_id/show" context={context} component={ViewBook} /> */}
      <PrivateRoute exact path="/reports/:_id/view" context={context} component={ViewReport} />
      <PrivateRoute exact path="/evaluations/:_id" context={context} component={ViewEvaluation} />
      <AdminRoute exact path="/admin/dashboard" context={context} component={Dashboard} />
      <AdminRoute exact path="/admin/courses/all" context={context} component={TableCourseList} />
      <AdminRoute exact path="/courses/add_course" context={context} component={AddCourse} />
      <AdminRoute exact path="/courses/:_id/edit_course" context={context} component={EditCourse} />
      <AdminRoute exact path="/courses/:_id/add_student" context={context} component={CourseAddStudent} />
      {/* <AdminRoute exact path="/courses/:_id/add_book" context={context} component={CourseAddBook} /> */}
      <AdminRoute exact path="/admin/students/all" context={context} component={StudentList} />
      <AdminRoute exact path="/students/:_id/view" context={context} component={ShowStudent} />
      {/* <AdminRoute exact path="/admin/books/all" context={context} component={BookListContainer} />
      <AdminRoute exact path="/books/new" context={context} component={NewBook} />
      <AdminRoute exact path="/books/:_id/edit" context={context} component={EditBook} /> */}
      <AdminRoute exact path="/admin/teachers/new" context={context} component={AdminTeacherNew} />
      <AdminRoute exact path="/admin/teachers/:_id/edit" context={context} component={AdminTeacherEdit} />
      <AdminRoute exact path="/admin/students/new" context={context} component={AdminStudentNew} />
      <AdminRoute exact path="/admin/students/:_id/edit" context={context} component={AdminStudentEdit} />
      <AdminRoute exact path="/admin/notifications" context={context} component={Notification} />
      <AdminRoute exact path="/assets" context={context} component={AssetsDashboard} />
      <AdminRoute exact path="/assets/level_salaries" context={context} component={AssetsDashboard} />
      <AdminRoute exact path="/assets/teacher_salaries" context={context} component={AssetsDashboard} />
      <AdminRoute exact path="/assets/transactions" context={context} component={AssetsDashboard} />
      <AdminRoute exact path="/assets/tuitions" context={context} component={AssetsDashboard} />
      <AdminRoute exact path="/assets/profit" context={context} component={AssetsDashboard} />
      <AdminRoute exact path="/assets/teacher_rates" context={context} component={AssetsDashboard} />
      <AdminRoute exact path="/admin/teachers/all" context={context} component={TeacherList} />
      <AdminRoute exact path="/teachers/:_id/view" context={context} component={ShowTeacher} />
      <StudentRoute exact path="/students/:_id/schedule" context={context} component={StudentDashboard} />
      <StudentRoute exact path="/students/:_id/profile" context={context} component={StudentProfile} />
      <StudentRoute exact path="/students/:_id/dashboard" context={context} component={StudentDashboard} />
      <StudentRoute exact path="/students/:_id/assets" context={context} component={StudentDashboard} />
      <StudentRoute exact path="/students/:_id/books" context={context} component={StudentDashboard} />
      <TeacherRoute exact path="/teachers/:_id/dashboard" context={context} component={TeacherDashboard} />
      <TeacherRoute exact path="/teachers/:_id/profile" context={context} component={TeacherProfile} />
      <TeacherRoute exact path="/teachers/:_id/courses/:course_id" context={context} component={TeacherCourseManager} />
      <TeacherRoute exact path="/teachers/:_id/courses/:course_id/new_report" context={context} component={ReportFormContainer} />
      <TeacherRoute exact path="/teachers/:_id/courses/:course_id/reports/:report_id" context={context} component={ReportFormContainer} />
      <TeacherRoute exact path="/teachers/:_id/reports" context={context} component={AllReports} />
    </Switch>
  )
}

export default Routes
