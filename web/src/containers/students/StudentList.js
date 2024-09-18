import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import M from 'materialize-css';
import { Skeleton } from '@material-ui/lab'
import { Row, Col, Table, Card } from 'react-materialize';

import Breadcrumb from '../../components/layouts/Breadcrumb';
import Header from '../../components/layouts/Header';
import Footer from '../../components/layouts/Footer';
import Student from '../../containers/students/Student';

// import { setLoadingStatus } from "../../actions/status_actions";
// import { getStudents } from "../../actions/students_actions";
import axios from 'axios';

const StudentList = props => {

  const [loading, setLoading] = useState(true)
  const [students, setStudents] = useState([])
  const [status, setStatus] = useState("active")

  const fetData = () => {
    axios.get('/students')
    .then(res => {
      setStudents(res.data)
      setLoading(false)
    })
    .catch(err => {
      console.log(err)
    })
  }

  useEffect(() => {
    fetData()
  }, [])

  const updatedStudent = () => {
    fetData()
  }

  let pendingStudentList;
  let pendingStudent = [];

  let inactiveStudentList;
  let inactiveStudent = [];

  let activeStudentList;
  let activeStudent = [];

  let createdStudentList;
  let createdStudent = [];

  if(students.length > 0) {
    students.forEach((student) => {

      if(student.status === "pending") pendingStudent.push(student);
      else if(student.status === "active" || student.status === "RESET_REQUIRED") activeStudent.push(student);
      else if(student.status === "inactive") inactiveStudent.push(student)

      if(student.temporary) createdStudent.push(student);
    });

    pendingStudentList = pendingStudent.map((student, index) => {
      return (
        <Student key={index} id={`pending${index}`} student={student} updatedStudent={updatedStudent} />
      );
    });

    inactiveStudentList = inactiveStudent.map((student, index) => {
      return (
        <Student key={index} id={`inactive${index}`} student={student} updatedStudent={updatedStudent} />
      )
    });

    activeStudentList = activeStudent.map((student, index) => {
      return (
        <Student key={index} id={`active${index}`} student={student} updatedStudent={updatedStudent} />
      )
    });

    createdStudentList = createdStudent.map((student, index) => {
      return (
        <Student key={index} id={`created${index}`} student={student} tab="RESET_REQUIRED" />
      )
    });
  }

  const commonHeader = <thead>
                          <tr>
                            <th>英文名</th>
                            <th>姓名</th>
                            <th>年龄</th>
                            <th>剩余课时费(元)</th>
                            <th>性别</th>
                            <th>城市</th>
                            <th>更改状态</th>
                            <th>更多操作</th>
                          </tr>
                        </thead>

  let pendingStudentTable = pendingStudent.length > 0 ?
                            <Row>
                              <Col m={12}>
                                <Table>
                                  {commonHeader}
                                  <tbody>
                                    {pendingStudentList}
                                  </tbody>
                                </Table>
                              </Col>
                            </Row> :
                            <Card className='white' textClassName='blue-text'>
                              <h4 className="center">没有试课学生</h4>
                            </Card>
  
  let inactiveStudentTable = inactiveStudent.length > 0 ? 
                            <Row>
                              <Col m={12}>
                                <Table>
                                  {commonHeader}
                                  <tbody>
                                    {inactiveStudentList}
                                  </tbody>
                                </Table>
                              </Col>
                            </Row> :
                            <Card className='white' textClassName='blue-text'>
                              <h4 className="center">没有往期的学生</h4>
                            </Card>
  
  let activeStudentTable = activeStudent.length > 0 ? 
                            <Row>
                              <Col m={12}>
                                <Table>
                                  {commonHeader}
                                  <tbody>
                                    {activeStudentList}
                                  </tbody>
                                </Table>
                              </Col>
                            </Row> :
                            <Card className='white' textClassName='blue-text'>
                              <h4 className="center">没有上课的学生</h4>
                            </Card>

  let createdStudentTable = createdStudent.length > 0 ? 
                            <Row>
                              <Col m={12}>
                                <Table className="highlight">
                                  <thead>
                                    <tr>
                                      <th>英文名</th>
                                      <th>姓名</th>
                                      <th>年龄</th>
                                      <th>剩余课时费(元)</th>
                                      <th>性别</th>
                                      <th>城市</th>
                                      <th>学生编号</th>
                                      <th>更多操作</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {createdStudentList}
                                  </tbody>
                                </Table>
                              </Col>
                            </Row> :
                            <Card className='white' textClassName='blue-text'>
                              <h5 className="center">管理员生成的学生</h5>
                            </Card>

  let active = status === "active" ? "active" : "";
  let inactive = status === "inactive" ? "active" : "";
  let pending = status === "pending" ? "active" : "";
  let created = status === "created" ? "active" : "";

  return (
    <div>
      <Header />
      <Breadcrumb action="students" />
      {
        loading ?
        <div className="container page-min-height">
          <br/>
          <Row>
            <Col m={12}>
              <Skeleton height={70} width="10%" />
              <Skeleton height={50} width="100%" />
              <Skeleton height={50} width="100%" />
              <Skeleton height={50} width="100%" />
              <Skeleton height={50} width="100%" />
              <Skeleton height={50} width="100%" />
              <Skeleton height={50} width="100%" />
              <Skeleton height={50} width="100%" />
              <Skeleton height={50} width="100%" />
              <Skeleton height={50} width="100%" />
              <Skeleton height={50} width="100%" />
              <Skeleton height={50} width="100%" />
            </Col>
          </Row>
        </div>
        :
        <div className="container page-min-height">
          <br />
          <Row>
            <Col m={12}>
              <Link to="/admin/students/new">
                <button className="btn"><i className="material-icons left">add</i>添加学生</button>
              </Link>
            </Col>
          </Row>
          <div className="row">
            <div className="col s12">
              <ul className="tabs">
                <li className="tab col s3 m3"><a className={active} href="#active" onClick={(e) => setStatus("active")}>上课学生({activeStudent.length})</a></li>
                <li className="tab col s3 m3"><a onClick={(e) => setStatus("pending")} className={pending} href="#pending">试课学生({pendingStudent.length})</a></li>
                <li className="tab col s3 m3"><a onClick={(e) => setStatus("inactive")} className={inactive} href="#inactive">往期学生({inactiveStudent.length})</a></li>
                <li className="tab col s3 m3"><a onClick={(e) => setStatus("created")} className={created} href="#created">管理员生成的学生({createdStudent.length})</a></li>
              </ul>
            </div>
            <div id="active" className="col s12">{activeStudentTable}</div>
            <div id="pending" className="col s12">{pendingStudentTable}</div>
            <div id="inactive" className="col s12">{inactiveStudentTable}</div>
            <div id="created" className="col s12">{createdStudentTable}</div>
          </div>
          
        </div>
      }
      <Footer />
    </div>
  )
}

export default StudentList

// class StudentList extends React.Component {
//   constructor(props) {
//     super(props);

//     this.active = "active";
//   }

//   componentWillMount() {
//     this.props.setLoadingStatus(true);
//     this.props.getStudents("");
//   }

//   componentDidMount() {
//     M.AutoInit();
//   }

//   render() {
//     let pendingStudentList;
//     let pendingStudent = [];

//     let inactiveStudentList;
//     let inactiveStudent = [];

//     let activeStudentList;
//     let activeStudent = [];

//     let createdStudentList;
//     let createdStudent = [];

//     if(this.props.students.length > 0) {
//       this.props.students.forEach((student) => {

//         if(student.status === "pending") pendingStudent.push(student);
//         else if(student.status === "active" || student.status === "RESET_REQUIRED") activeStudent.push(student);
//         else if(student.status === "inactive") inactiveStudent.push(student)

//         if(student.temporary) createdStudent.push(student);
//       });

//       pendingStudentList = pendingStudent.map((student, index) => {
//         return (
//           <Student key={index} id={`pending${index}`} student={student} />
//         );
//       });

//       inactiveStudentList = inactiveStudent.map((student, index) => {
//         return (
//           <Student key={index} id={`inactive${index}`} student={student} />
//         )
//       });

//       activeStudentList = activeStudent.map((student, index) => {
//         return (
//           <Student key={index} id={`active${index}`} student={student} />
//         )
//       });

//       createdStudentList = createdStudent.map((student, index) => {
//         return (
//           <Student key={index} id={`created${index}`} student={student} tab="RESET_REQUIRED" />
//         )
//       });
//     }

//     const commonHeader = <thead>
//                             <tr>
//                               <th>英文名</th>
//                               <th>姓名</th>
//                               <th>年龄</th>
//                               <th>剩余课时费(元)</th>
//                               <th>性别</th>
//                               <th>城市</th>
//                               <th>更改状态</th>
//                               <th>更多操作</th>
//                             </tr>
//                           </thead>

//     let pendingStudentTable = pendingStudent.length > 0 ?
//                               <Row>
//                                 <Col m={12}>
//                                   <Table>
//                                     {commonHeader}
//                                     <tbody>
//                                       {pendingStudentList}
//                                     </tbody>
//                                   </Table>
//                                 </Col>
//                               </Row> :
//                               <Card className='white' textClassName='blue-text'>
//                                 <h4 className="center">没有试课学生</h4>
//                               </Card>
    
//     let inactiveStudentTable = inactiveStudent.length > 0 ? 
//                               <Row>
//                                 <Col m={12}>
//                                   <Table>
//                                     {commonHeader}
//                                     <tbody>
//                                       {inactiveStudentList}
//                                     </tbody>
//                                   </Table>
//                                 </Col>
//                               </Row> :
//                               <Card className='white' textClassName='blue-text'>
//                                 <h4 className="center">没有往期的学生</h4>
//                               </Card>
    
//     let activeStudentTable = activeStudent.length > 0 ? 
//                               <Row>
//                                 <Col m={12}>
//                                   <Table>
//                                     {commonHeader}
//                                     <tbody>
//                                       {activeStudentList}
//                                     </tbody>
//                                   </Table>
//                                 </Col>
//                               </Row> :
//                               <Card className='white' textClassName='blue-text'>
//                                 <h4 className="center">没有上课的学生</h4>
//                               </Card>

//     let createdStudentTable = createdStudent.length > 0 ? 
//                               <Row>
//                                 <Col m={12}>
//                                   <Table className="highlight">
//                                     <thead>
//                                       <tr>
//                                         <th>英文名</th>
//                                         <th>姓名</th>
//                                         <th>年龄</th>
//                                         <th>剩余课时费(元)</th>
//                                         <th>性别</th>
//                                         <th>城市</th>
//                                         <th>学生编号</th>
//                                         <th>更多操作</th>
//                                       </tr>
//                                     </thead>
//                                     <tbody>
//                                       {createdStudentList}
//                                     </tbody>
//                                   </Table>
//                                 </Col>
//                               </Row> :
//                               <Card className='white' textClassName='blue-text'>
//                                 <h5 className="center">管理员生成的学生</h5>
//                               </Card>

//     let active = this.active === "active" ? "active" : "";
//     let inactive = this.active === "inactive" ? "active" : "";
//     let pending = this.active === "pending" ? "active" : "";
//     let created = this.active === "created" ? "active" : "";

//     return (
//       <div>
//         <Header />
//         <Breadcrumb action="students" />
//         <div className="container page-min-height">
//           <br />
//           <Row>
//             <Col m={12}>
//               <Link to="/admin/students/new">
//                 <button className="btn"><i className="material-icons left">add</i>添加学生</button>
//               </Link>
//             </Col>
//           </Row>
//           <div className="row">
//             <div className="col s12">
//               <ul className="tabs">
//                 <li className="tab col s3 m3"><a className={active} href="#active" onClick={(e) => this.active = "active"}>上课学生({activeStudent.length})</a></li>
//                 <li className="tab col s3 m3"><a onClick={(e) => this.active = "pending"} className={pending} href="#pending">试课学生({pendingStudent.length})</a></li>
//                 <li className="tab col s3 m3"><a onClick={(e) => this.active = "inactive"} className={inactive} href="#inactive">往期学生({inactiveStudent.length})</a></li>
//                 <li className="tab col s3 m3"><a onClick={(e) => this.active = "created"} className={created} href="#created">管理员生成的学生({createdStudent.length})</a></li>
//               </ul>
//             </div>
//             <div id="active" className="col s12">{activeStudentTable}</div>
//             <div id="pending" className="col s12">{pendingStudentTable}</div>
//             <div id="inactive" className="col s12">{inactiveStudentTable}</div>
//             <div id="created" className="col s12">{createdStudentTable}</div>
//           </div>
          
//         </div>
//         <Footer />
//       </div>
//     )
//   }
// }

// const mapStateToProps = state => {
//   return {
//     students: state.studentsData.students
//   };
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     setLoadingStatus: (status) => {
//       dispatch(setLoadingStatus(status))
//     },
//     getStudents: (query) => dispatch(getStudents(query)),
//   };
// }

// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StudentList));