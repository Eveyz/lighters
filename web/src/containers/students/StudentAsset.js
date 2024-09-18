import React from 'react'
import _ from 'lodash'

// import Loading from '../../components/Loading'

// import { getStudentData } from '../../actions/students_actions'
// import { setLoadingStatus } from '../../actions/status_actions'
import { getStudentReportCredit, getLocalTime } from '../../ultis'

const StudentAsset = props => {

  const cls = props.student.tuition_amount < 0 ? "red-text" : "green-text"

  var coursesHistory = <h5 className="center">没有上课记录</h5>
  
  var charges = []
  if(props.student.courses.length > 0) {
    var coursesList = []
    props.student.courses.forEach((course, index) => {
      _(course.reports).sortBy((report) => {
        return report.course_date
      }).value().forEach((report, idx) => {
        const charge = (getStudentReportCredit(report.situation) * course.course_rate).toFixed(2)
        charges.push(charge)
        coursesList.push(<tr key={`course-${index}-report-${idx}`}>
                            <td>{course.name}</td>
                            <td>{report.teacher_id.lastname + report.teacher_id.firstname}</td>
                            <td>{report.course_date}</td>
                            <td>{course.course_rate}</td>
                            <td>{report.situation}</td>
                            <td>{charge}</td>
                          </tr>)
      })
    })

    coursesHistory = <table className="highlight">
                      <thead>
                        <tr>
                          <th>课程名称</th>
                          <th>教师</th>
                          <th>上课日期</th>
                          <th>课时费(元)</th>
                          <th>上课情况</th>
                          <th>实际收费(元)</th>
                        </tr>
                      </thead>

                      <tbody>
                        {coursesList}
                      </tbody>
                    </table>
  }

  var tuitionHistory = <h5 className="center">没有缴费记录</h5>
  
  var sum = 0
  if(props.student.tuitions.length > 0) {
    var tuiitionsList = props.student.tuitions.map((tuition, index) => {
      sum += tuition.amount
      return <tr key={index}>
                <td>{tuition.amount.toFixed(2)}</td>
                <td>{getLocalTime(tuition.created_at)}</td>
              </tr>
    })
    tuitionHistory = <table className="highlight">
                      <thead>
                        <tr>
                          <th>课时费(元)</th>
                          <th>时间</th>
                        </tr>
                      </thead>

                      <tbody>
                        {tuiitionsList}
                      </tbody>
                    </table>
  }

  var remain = sum
  charges.forEach(charge => {
    remain -= charge
  })
  
  return (
    <div>
      <br />
      <div className="col s12 m12">
        <div className="card r-box-shadow">
          <div className="card-content">
            <span className="card-title blue-grey-text" style={{fontWeight: "400"}}><b>学生信息</b></span>
            <h6>名字: { props.student.lastname}{this.props.student.firstname}</h6>
            <h6>英文名字: {props.student.englishname}</h6>
            <h6>性别: {props.student.gender}</h6>
            <h6>课时费余额(元): <span className={cls}> {this.props.student.tuition_amount.toFixed(2)}</span></h6>
          </div>
        </div>
      </div>
      <div className="col s12 m12">
        <div className="card r-box-shadow">
          <div className="card-content">
            <span className="card-title blue-grey-text" style={{fontWeight: "400"}}><b>缴费记录 (总额: <span className={cls}>{sum.toFixed(2)}</span>元)</b></span>
            {tuitionHistory}
          </div>
        </div>
      </div>
      <div className="col s12 m12">
        <div className="card r-box-shadow">
          <div className="card-content">
            <span className="card-title blue-grey-text" style={{fontWeight: "400"}}><b>上课记录</b></span>
            {coursesHistory}
            <h5>余额总计(元): <span className={ remain < 0 ? "red-text" : "green-text"}>{remain.toFixed(2)}</span></h5>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentAsset;

// class StudentAsset extends React.Component {

// 	componentDidMount() {
// 		// this.props.setLoadingStatus(true)
//     // this.props.getStudentData(this.props.student_id)
// 	}

// 	render() {

// 		// if(this.props.isLoading) {
//     //   return <Loading />
//     // }

//     const cls = this.props.student.tuition_amount < 0 ? "red-text" : "green-text"

//     var coursesHistory = <h5 className="center">没有上课记录</h5>
    
//     var charges = []
//     if(this.props.student.courses.length > 0) {
//       var coursesList = []
//       this.props.student.courses.forEach((course, index) => {
//         _(course.reports).sortBy((report) => {
//           return report.course_date
//         }).value().forEach((report, idx) => {
//           const charge = (getStudentReportCredit(report.situation) * course.course_rate).toFixed(2)
//           charges.push(charge)
//           coursesList.push(<tr key={`course-${index}-report-${idx}`}>
//                               <td>{course.name}</td>
//                               <td>{report.teacher_id.lastname + report.teacher_id.firstname}</td>
//                               <td>{report.course_date}</td>
//                               <td>{course.course_rate}</td>
//                               <td>{report.situation}</td>
//                               <td>{charge}</td>
//                             </tr>)
//         })
//       })

//       coursesHistory = <table className="highlight">
//                         <thead>
//                           <tr>
//                             <th>课程名称</th>
//                             <th>教师</th>
//                             <th>上课日期</th>
//                             <th>课时费(元)</th>
//                             <th>上课情况</th>
//                             <th>实际收费(元)</th>
//                           </tr>
//                         </thead>

//                         <tbody>
//                           {coursesList}
//                         </tbody>
//                       </table>
//     }

//     var tuitionHistory = <h5 className="center">没有缴费记录</h5>
    
//     var sum = 0
//     if(this.props.student.tuitions.length > 0) {
//       var tuiitionsList = this.props.student.tuitions.map((tuition, index) => {
//         sum += tuition.amount
//         return <tr key={index}>
//                   <td>{tuition.amount.toFixed(2)}</td>
//                   <td>{getLocalTime(tuition.created_at)}</td>
//                 </tr>
//       })
//       tuitionHistory = <table className="highlight">
//                         <thead>
//                           <tr>
//                             <th>课时费(元)</th>
//                             <th>时间</th>
//                           </tr>
//                         </thead>

//                         <tbody>
//                           {tuiitionsList}
//                         </tbody>
//                       </table>
//     }

//     var remain = sum
//     charges.forEach(charge => {
//       remain -= charge
// 		})
		
// 		return (
// 			<div>
// 				<br />
// 				<div className="col s12 m12">
// 					<div className="card r-box-shadow">
// 						<div className="card-content">
// 							<span className="card-title blue-grey-text" style={{fontWeight: "400"}}><b>学生信息</b></span>
// 							<h6>名字: { this.props.student.lastname}{this.props.student.firstname}</h6>
// 							<h6>英文名字: {this.props.student.englishname}</h6>
// 							<h6>性别: {this.props.student.gender}</h6>
// 							<h6>课时费余额(元): <span className={cls}> {this.props.student.tuition_amount.toFixed(2)}</span></h6>
// 						</div>
// 					</div>
// 				</div>
// 				<div className="col s12 m12">
// 					<div className="card r-box-shadow">
// 						<div className="card-content">
// 							<span className="card-title blue-grey-text" style={{fontWeight: "400"}}><b>缴费记录 (总额: <span className={cls}>{sum.toFixed(2)}</span>元)</b></span>
// 							{tuitionHistory}
// 						</div>
// 					</div>
// 				</div>
// 				<div className="col s12 m12">
// 					<div className="card r-box-shadow">
// 						<div className="card-content">
// 							<span className="card-title blue-grey-text" style={{fontWeight: "400"}}><b>上课记录</b></span>
// 							{coursesHistory}
// 							<h5>余额总计(元): <span className={ remain < 0 ? "red-text" : "green-text"}>{remain.toFixed(2)}</span></h5>
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 		)
// 	}
// }

// const mapStateToProps = state => {
//   return {
//     student: state.auth.identityData,
//     isLoading: state.status.loading
//   };
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     setLoadingStatus: (status) => {
//       dispatch(setLoadingStatus(status))
//     },
//     getStudentData: (id) => dispatch(getStudentData(id))
//   };
// }

// export default connect(mapStateToProps, mapDispatchToProps)(StudentAsset)