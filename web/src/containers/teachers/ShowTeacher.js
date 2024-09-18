import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import _ from 'lodash'

import Header from '../../components/layouts/Header';
import Footer from '../../components/layouts/Footer';
import Breadcrumb from '../../components/layouts/Breadcrumb';
import Loading from '../../components/Loading'
import { getLocalTime } from '../../ultis'

const ShowTeacher = props => {

  const [isLoading, setIsLoading] = useState(true)
  const [teacher, setTeacher] = useState(null)
  const [reports, setReports] = useState({})
  const [ts, setTs] = useState(null)

  useEffect(() => {
    axios.get(`/teachers/${props.match.params._id}/profile`)
    .then((response) => {
        console.log(response.data)
        setTeacher(response.data.teacher)
        setReports(response.data.reports)
        setTs(response.data.teacher_level)
        setIsLoading(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  var report_list = []
  if(!_.isEmpty(reports)) {
    // var len = Object.keys(reports).length
    // report_list = Array(len).fill("")
    // var index = 0
    for(const month in reports) {
      var report_row =  <div key={`${month}`} className="card r-box-shadow">
                          <div className="card-content">
                            <span className="card-title blue-grey-text" style={{fontWeight: "400"}}><b>{month}({reports[month].length})</b></span>
                            <table>
                              <thead>
                                <tr>
                                  <th>课程名称</th>
                                  <th>上课时间</th>
                                  <th>上课情况</th>
                                  <th>课时</th>
                                  <th>更多</th>
                                </tr>
                              </thead>

                              <tbody>
                                {
                                  reports[month].map((r, idx) => {
                                    return  <tr key={idx}>
                                              <td>{r.course_id.name}</td>
                                              <td>{r.course_date}</td>
                                              <td>{r.situation}</td>
                                              <td>{r.credit}</td>
                                              <td><Link target="_blank" to={`/reports/${r._id}/view`}>查看</Link></td>
                                            </tr>
                                  })
                                }
                              </tbody>
                            </table>
                          </div>
                        </div>
      // report_list[len - index] = report_row
      // index += 1
      report_list.push(report_row)
    }
  }

  return (
    <div>
      <Header />
      <Breadcrumb action="showTeacher" />
      {
        isLoading ?
        <Loading />
        :
        <div className="container page-min-height">
          <br />
          <div className="col s12 m12">
            <div className="card r-box-shadow">
              <div className="card-content">
                <span className="card-title blue-grey-text" style={{fontWeight: "400"}}><b>教师信息</b></span>
                <h6>名字: {teacher.lastname}{teacher.firstname}</h6>
                <h6>英文名字: {teacher.englishname}</h6>
                <h6>级别: {teacher.level}级</h6>
                <h6>性别: {teacher.gender}</h6>
                {
                  ts ?
                  <h6>上次升级时间: {getLocalTime(ts.created_at)}</h6>
                  :
                  ""
                }
                <br/>
                <Link to={`/admin/teachers/${teacher._id}/edit`} className="btn">编辑</Link>
              </div>
            </div>
          </div>
          {
            report_list.length > 0 ? report_list : ""
          }
        </div>
      }
      <Footer />
    </div>
  )
}

export default ShowTeacher

// class ShowTeacher extends React.Component {
//   componentWillMount() {
//     this.props.getTeacherData(this.props.match.params._id)
//   }

//   render() {
//     return(
//       <div>
//         <Header />
//         <Breadcrumb action="showTeacher" />
//         <div className="container page-min-height">
//           <br />
//           <div className="col s12 m12">
//             <div className="card r-box-shadow">
//               <div className="card-content">
//                 <span className="card-title blue-grey-text" style={{fontWeight: "400"}}><b>教师信息</b></span>
//                 <h6>名字: { this.props.teacher.lastname}{this.props.teacher.firstname}</h6>
//                 <h6>英文名字: {this.props.teacher.englishname}</h6>
//                 <h6>级别: {this.props.teacher.level}级</h6>
//                 <h6>性别: {this.props.teacher.gender}</h6>
//               </div>
//             </div>
//           </div>
//           <Link to={`/admin/teachers/${this.props.teacher._id}/edit`} className="btn">编辑</Link>
//         </div>
//         <Footer />
//       </div>
//     )
//   }
// }

// const mapStateToProps = state => {
//   // this.props.search
//   return {
//     teacher: state.teachersData.currentTeacher
//   };
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     getTeacherData: (id) => dispatch(getTeacherData(id)),
//     updateTeacher: (id, field) => dispatch(updateTeacher(id, field))
//   };
// }

// export default connect(mapStateToProps, mapDispatchToProps)(ShowTeacher);
