import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import M from 'materialize-css';
import { Row, Col, Table, Card } from 'react-materialize';
import axios from 'axios'
import _ from 'lodash'
import { Skeleton } from '@material-ui/lab'

import Teacher from '../../containers/teachers/Teacher';
import Header from '../../components/layouts/Header';
import Footer from '../../components/layouts/Footer';
import Breadcrumb from '../../components/layouts/Breadcrumb';
// import { getTeachers } from '../../actions/teachers_actions';
// import { setLoadingStatus } from "../../actions/status_actions";

const TeacherList = props => {

  const [isLoading, setIsLoading] = useState(true)
  const [teachers, setTeachers] = useState({})
  const [status, setStatus] = useState("active")

  const fetchData = () => {
    axios.get(`/teachers?group_by=status`)
      .then((res) => {
        setTeachers(res.data)
        setIsLoading(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    fetchData()
  }, [])

  const updatedTeacher = () => {
    fetchData()
  }

  useEffect(() => {
    M.AutoInit()
  }, [isLoading])

  let pendingTeacherList = [];

  let activeTeacherList = [];

  let createdTeacherList = [];

  if(!_.isEmpty(teachers)) {

    pendingTeacherList = teachers["pending"].map((teacher, index) => {
      return (
        <Teacher key={index} id={`pending${index}`} teacher={teacher} updatedTeacher={updatedTeacher} />
      );
    });

    activeTeacherList = teachers["active"].map((teacher, index) => {
      return (
        <Teacher key={index} id={`active${index}`} teacher={teacher} updatedTeacher={updatedTeacher} />
      )
    });

    createdTeacherList = teachers["system"].map((teacher, index) => {
      return (
        <Teacher key={index} id={`created${index}`} teacher={teacher} tab="RESET_REQUIRED" updatedTeacher={updatedTeacher} />
      )
    })
  }

  let pendingTeacherTable = pendingTeacherList.length > 0 ?
                            <Row>
                              <Col m={12}>
                                <Table className="highlight">
                                  <thead>
                                    <tr>
                                      <th>姓名</th>
                                      <th>年龄</th>
                                      <th>级别</th>
                                      <th>性别</th>
                                      <th>城市</th>
                                      <th>更改状态</th>
                                      <th>更多操作</th>
                                    </tr>
                                  </thead>

                                  <tbody>
                                    {pendingTeacherList}
                                  </tbody>
                                </Table>
                              </Col>
                            </Row> :
                            <Card className='white' textClassName='blue-text'>
                              <h5 className="center">当前没有待定教师</h5>
                            </Card>
  
  let activeTeacherTable = activeTeacherList.length > 0 ? 
                            <Row>
                              <Col m={12}>
                                <Table className="highlight">
                                  <thead>
                                    <tr>
                                      <th>姓名</th>
                                      <th>年龄</th>
                                      <th>级别</th>
                                      <th>性别</th>
                                      <th>城市</th>
                                      <th>更改状态</th>
                                      <th>更多操作</th>
                                    </tr>
                                  </thead>

                                  <tbody>
                                    {activeTeacherList}
                                  </tbody>
                                </Table>
                              </Col>
                            </Row> :
                            <Card className='white' textClassName='blue-text'>
                              <h5 className="center">当前没有在职教师</h5>
                            </Card>
  
  let createdTeacherTable = createdTeacherList.length > 0 ? 
                            <Row>
                              <Col m={12}>
                                <Table className="highlight">
                                  <thead>
                                    <tr>
                                      <th>姓名</th>
                                      <th>性别</th>
                                      <th>用户名</th>
                                      <th>临时密码</th>
                                      <th>更多操作</th>
                                    </tr>
                                  </thead>

                                  <tbody>
                                    {createdTeacherList}
                                  </tbody>
                                </Table>
                              </Col>
                            </Row> :
                            <Card className='white' textClassName='blue-text'>
                              <h5 className="center">管理员生成的教师</h5>
                            </Card>

  let active = status === "active" ? "active" : "";
  let pending = status === "pending" ? "active" : "";
  let created = status === "created" ? "active" : "";

  return (
    <div>
      <Header />
      <Breadcrumb action="teachers" />
      {
        isLoading ?
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
              <Link to="/admin/teachers/new">
                <button className="btn"><i className="material-icons left">add</i>添加教师</button>
              </Link>
            </Col>
          </Row>
          <div className="row">
            <div className="col s12">
              <ul className="tabs">
                <li className="tab col s4 m4"><a className={active} href="#active" onClick={(e) => setStatus("active") }>在职教师({activeTeacherList.length})</a></li>
                <li className="tab col s4 m4"><a onClick={(e) => setStatus("pending")} className={pending} href="#pending">待定教师({pendingTeacherList.length})</a></li>
                <li className="tab col s4 m4"><a onClick={(e) => setStatus("created")} className={created} href="#created">管理员生成的教师({createdTeacherList.length})</a></li>
              </ul>
            </div>
            <div id="active" className="col s12">{activeTeacherTable}</div>
            <div id="pending" className="col s12">{pendingTeacherTable}</div>
            <div id="created" className="col s12">{createdTeacherTable}</div>
          </div>
        </div>
      }
      <Footer />
    </div>
  )
}

export default TeacherList

// class TeacherList extends React.Component {
//   constructor(props) {
//     super(props);

//     this.active = "active";
//   }

//   componentWillMount() {
//     this.props.setLoadingStatus(true);
//     this.props.getTeachers();
//   }

//   componentDidMount() {
//     M.AutoInit();
//   }

//   render() {
//     let pendingTeacherList;
//     let pendingTeacher = [];

//     let activeTeacherList;
//     let activeTeacher = [];

//     let createdTeacherList;
//     let createdTeacher = [];

//     if(this.props.teachers.length > 0) {
//       this.props.teachers.forEach((teacher) => {
//         if(teacher.status === "pending") pendingTeacher.push(teacher);
//         else if(teacher.status === "active" || teacher.status === "RESET_REQUIRED") activeTeacher.push(teacher);
//         if(teacher.temporary) createdTeacher.push(teacher);
//       });

//       pendingTeacherList = pendingTeacher.map((teacher, index) => {
//         return (
//           <Teacher key={index} id={`pending${index}`} teacher={teacher} />
//         );
//       });

//       activeTeacherList = activeTeacher.map((teacher, index) => {
//         return (
//           <Teacher key={index} id={`active${index}`} teacher={teacher} />
//         )
//       });

//       createdTeacherList = createdTeacher.map((teacher, index) => {
//         return (
//           <Teacher key={index} id={`created${index}`} teacher={teacher} tab="RESET_REQUIRED" />
//         )
//       })
//     }

//     let pendingTeacherTable = pendingTeacher.length > 0 ?
//                               <Row>
//                                 <Col m={12}>
//                                   <Table className="highlight">
//                                     <thead>
//                                       <tr>
//                                         <th>姓名</th>
//                                         <th>年龄</th>
//                                         <th>级别</th>
//                                         <th>性别</th>
//                                         <th>城市</th>
//                                         <th>更改状态</th>
//                                         <th>更多操作</th>
//                                       </tr>
//                                     </thead>

//                                     <tbody>
//                                       {pendingTeacherList}
//                                     </tbody>
//                                   </Table>
//                                 </Col>
//                               </Row> :
//                               <Card className='white' textClassName='blue-text'>
//                                 <h5 className="center">当前没有待定教师</h5>
//                               </Card>
    
//     let activeTeacherTable = activeTeacher.length > 0 ? 
//                               <Row>
//                                 <Col m={12}>
//                                   <Table className="highlight">
//                                     <thead>
//                                       <tr>
//                                         <th>姓名</th>
//                                         <th>年龄</th>
//                                         <th>级别</th>
//                                         <th>性别</th>
//                                         <th>城市</th>
//                                         <th>更改状态</th>
//                                         <th>更多操作</th>
//                                       </tr>
//                                     </thead>

//                                     <tbody>
//                                       {activeTeacherList}
//                                     </tbody>
//                                   </Table>
//                                 </Col>
//                               </Row> :
//                               <Card className='white' textClassName='blue-text'>
//                                 <h5 className="center">当前没有在职教师</h5>
//                               </Card>
    
//     let createdTeacherTable = createdTeacher.length > 0 ? 
//                               <Row>
//                                 <Col m={12}>
//                                   <Table className="highlight">
//                                     <thead>
//                                       <tr>
//                                         <th>姓名</th>
//                                         <th>性别</th>
//                                         <th>用户名</th>
//                                         <th>临时密码</th>
//                                         <th>更多操作</th>
//                                       </tr>
//                                     </thead>

//                                     <tbody>
//                                       {createdTeacherList}
//                                     </tbody>
//                                   </Table>
//                                 </Col>
//                               </Row> :
//                               <Card className='white' textClassName='blue-text'>
//                                 <h5 className="center">管理员生成的教师</h5>
//                               </Card>

//     let active = this.active === "active" ? "active" : "";
//     let pending = this.active === "pending" ? "active" : "";
//     let created = this.active === "created" ? "active" : "";

//     return (
//       <div>
//         <Header />
//         <Breadcrumb action="teachers" />
//         <div className="container page-min-height">
//           <br />
//           <Row>
//             <Col m={12}>
//               <Link to="/admin/teachers/new">
//                 <button className="btn"><i className="material-icons left">add</i>添加教师</button>
//               </Link>
//             </Col>
//           </Row>
//           <div className="row">
//             <div className="col s12">
//               <ul className="tabs">
//                 <li className="tab col s4 m4"><a className={active} href="#active" onClick={(e) => this.active = "active"}>在职教师({activeTeacher.length})</a></li>
//                 <li className="tab col s4 m4"><a onClick={(e) => this.active = "pending"} className={pending} href="#pending">待定教师({pendingTeacher.length})</a></li>
//                 <li className="tab col s4 m4"><a onClick={(e) => this.active = "created"} className={created} href="#created">管理员生成的教师({createdTeacher.length})</a></li>
//               </ul>
//             </div>
//             <div id="active" className="col s12">{activeTeacherTable}</div>
//             <div id="pending" className="col s12">{pendingTeacherTable}</div>
//             <div id="created" className="col s12">{createdTeacherTable}</div>
//           </div>
//         </div>
//         <Footer />
//       </div>
//     )
//   }
// }

// const mapStateToProps = state => {
//   return {
//     teachers: state.teachersData.teachers
//   };
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     setLoadingStatus: (status) => {
//       dispatch(setLoadingStatus(status))
//     },
//     getTeachers: () => {
//       dispatch(getTeachers())
//     }
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(TeacherList);