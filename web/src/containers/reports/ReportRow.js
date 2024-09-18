import React, { useEffect, useState, useRef } from "react";
import { Link } from 'react-router-dom';
import Modal from '@material-ui/core/Modal';
import M from 'materialize-css';
import axios from 'axios'
import history from '../../history'

// import { editReport, copyReport, deleteReport } from '../../actions/reports_actions';
import Working from '../../components/Working';
import CopyReportModal from './CopyReportModal'

const ReportRow = props => {

  const [course, setCourse] = useState(props.course._id)
  const [student, setStudent] = useState(null)
  const [disabled, setDisabled] = useState(props.course ? false : true)
  const [open, setOpen] = useState(false)
  const [submit, setSubmit] = useState(false)
  const [success, setSuccess] = useState(false)
  // eslint-disable-next-line
  const [isLoading, setIsLoading] = useState(false)

  const courseRef = useRef(null)
  const studentRef = useRef(null)

  const initSelect = () => {
    var selects = document.querySelectorAll('select');
    M.FormSelect.init(selects, {});

    var tooltips = document.querySelectorAll('.tooltipped');
    M.Tooltip.init(tooltips, {});
  }

  useEffect(() => {
    initSelect()
  }, [])

  // Select course in copy modal
  const selectCourse = () => {
    setCourse(courseRef.current.value)
    setStudent(null)
    setDisabled(false)
  }

  // Select student in copy modal
  const selectStudent = () => {
    setStudent(studentRef.current.value)
    setDisabled(false)
  }

  const copyReport = () => {
    const course_id = course
    const student_id = student
    const teacher_id = props.teacher._id
    const report_id = props.report._id
    setOpen(false)
    setSubmit(true)
    let url = `/reports/copy_report?course_id=${course_id}&student_id=${student_id}&teacher_id=${teacher_id}&report_id=${report_id}`;
    axios.get(url).then((response) => {
      if(course_id === props.course._id && student_id === props.student._id) {
        // only add to report list for rendering if copy targeted course is the same with current course
        props.addToReportList(response.data)
      }
      setSuccess(true)
      setSubmit(false)
      setIsLoading(false)
      window.Materialize.toast('成功复制反馈表', 2000, 'green');
    }).catch((err) => {
      console.log(err)
    })
  }

  const deleteReport = () => {
    axios.delete(`/reports/${props.report._id}`)
      .then((response) => {
        props.removeFromReportList(props.report._id)
        window.Materialize.toast('成功删除反馈表', 1000, 'green');
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const editReport = () => {
    let path = `/teachers/${props.teacher._id}/courses/${props.course._id}/reports/${props.report._id}`;
    // this.props.editReport(this.props.report, path);
    history.push({
      pathname: path,
      state: { teacher: props.teacher, course: props.course, student: props.student }
    })
  }

  // eslint-disable-next-line
  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  if(submit && success) {
    return <tr><td><Working msg="正在复制反馈表, 请耐心等候 :)" /></td></tr>
  }

  let defaultCourseOption = ""

  let courseOptions = [] 
  props.courses.forEach((course, idx) => {
    if(course.status === "active") {
      if(course._id === props.course._id) defaultCourseOption = <option value={course._id}>{course.name}</option>
      else courseOptions.push(<option key={idx} value={course._id}>{course.name}</option>)
    }
  })

  // let disabled = disabled
  
  let studentOptions = ""
  if(course) {
    let cre = props.courses.find(c => {
      return c._id === course
    })
    if(cre) {
      studentOptions = cre.students.map((student, idx) => {
        return <option key={idx} value={student._id}>{student.englishname}</option>
      })
    }
  }

  const btnDisabled = submit && success ? true : false
  const copyModal = <div>
                      <i className="material-icons blue-text clickable tooltipped" data-position="bottom" data-tooltip="复制反馈表" onClick={handleOpen}>content_copy</i>
                      <Modal
                        open={open}
                        onClose={handleClose}
                      >
                        <div>
                          <CopyReportModal
                            disabled={disabled}
                            courseRef={courseRef}
                            studentRef={studentRef}
                            btnDisabled={btnDisabled}
                            courseOptions={courseOptions}
                            studentOptions={studentOptions} 
                            selectCourse={selectCourse} 
                            selectStudent={selectStudent}
                            copyReport={copyReport}
                            handleClose={handleClose}
                            defaultCourseOption={defaultCourseOption}
                          />
                        </div>
                      </Modal>
                    </div>

  return (
    <tr>
      <td>第{ props.length - props.idx }次</td>
      <td>{ props.report.course_date }</td>
      <td>{ props.student.englishname }</td>
      <td>{ props.student.age }</td>
      <td>{ props.course.name }</td>
      <td>
        <Link to={`/reports/${props.report._id}/view`} target="_blank">
          <i className="material-icons cyan-text clickable tooltipped" data-position="bottom" data-tooltip="查看反馈表">visibility</i>
        </Link>
      </td>
      {
        (props.course.status === "active" && !props.report.paid) ? <td><i className="material-icons blue-text clickable" onClick={editReport}>edit</i></td> : <td><i className="material-icons grey-text clickable">edit</i></td>
      }
      { 
        props.course.status === "active" ? <td>{copyModal}</td> : <td><i className="material-icons grey-text clickable">content_copy</i></td>
      }
      { 
        (props.course.status === "active" && !props.report.paid) ? <td><i className="material-icons red-text clickable" onClick={() => { if (window.confirm('确定要删除此反馈表?')) deleteReport()}}>delete</i></td> : <td><i className="material-icons grey-text clickable">delete</i></td>
      }
    </tr>
  )
}

export default ReportRow

// class ReportRow extends React.Component {

//   constructor(props) {
//     super(props)

//     this.state = {
//       course: '',
//       student: '',
//       disabled: true,
//       open: false,
//       submit: false
//     }

//     this.course = React.createRef()
//     this.student = React.createRef()

//     this.selectCourse = this.selectCourse.bind(this);
//     this.selectStudent = this.selectStudent.bind(this);
//     this.copyReport = this.copyReport.bind(this);
//     this.deleteReport = this.deleteReport.bind(this);
//     this.handleOpen = this.handleOpen.bind(this);
//     this.handleClose = this.handleClose.bind(this);
//   }

//   initSelect() {
//     var selects = document.querySelectorAll('select');
//     M.FormSelect.init(selects, {});

//     var tooltips = document.querySelectorAll('.tooltipped');
//     M.Tooltip.init(tooltips, {});
//   }

//   componentDidMount() {
//     this.initSelect()
//   }

//   componentDidUpdate() {
//     this.initSelect()
//   }

//   selectCourse() {
//     this.setState({
//       course: this.course.current.value,
//       student: "",
//       disabled: false
//     })
//   }

//   selectStudent = () => {
//     this.setState({
//       student: this.student.current.value,
//       disabled: false
//     })
//   }

//   copyReport = () => {
//     const course_id = this.state.course
//     const student_id = this.state.student
//     const teacher_id = this.props.teacher_id
//     const report_id = this.props.report._id
//     this.setState({
//       open: false,
//       submit: true
//     })
//     this.props.copyReport(this.props.student._id, course_id, student_id, teacher_id, report_id)
//   }

//   deleteReport = () => {
//     this.props.deleteReport(this.props.report._id);
//   }

//   editReport = () => {
//     let path = "/teachers/" + this.props.user_id + "/edit_report";
//     this.props.editReport(this.props.report, path);
//   }

//   handleOpen = () => {
//     this.setState({
//       open: true
//     })
//   }

//   handleClose = () => {
//     this.setState({
//       open: false
//     })
//   }

//   render() {

//     if(this.state.submit && this.props.success) {
//       return <tr><td><Working msg="正在复制反馈表, 请耐心等候 :)" /></td></tr>
//     }

//     let courseOptions = this.props.courses.map((course, idx) => {
//       return <option key={idx} value={course.id}>{course.name}</option>
//     })

//     let disabled = this.state.disabled
    
//     let studentOptions = ""
//     if(this.state.course) {
//       let cre = this.props.courses.find(course => {
//         return course.id === this.state.course
//       })
//       if(cre) {
//         studentOptions = cre.students.map((student, idx) => {
//           return <option key={idx} value={student.id}>{student.englishname}</option>
//         })
//       }
//     }

//     const btnDisabled = this.state.submit && this.props.success ? true : false
//     const copyModal = <div>
//                         <i className="material-icons blue-grey-text clickable tooltipped" data-position="bottom" data-tooltip="复制反馈表" onClick={this.handleOpen}>content_copy</i>
//                         <Modal
//                           open={this.state.open}
//                           onClose={this.handleClose}
//                         >
//                           <div>
//                             <CopyReportModal
//                               disabled={disabled}
//                               courseRef={this.course}
//                               studentRef={this.student}
//                               btnDisabled={btnDisabled}
//                               courseOptions={courseOptions}
//                               studentOptions={studentOptions} 
//                               selectCourse={this.selectCourse} 
//                               selectStudent={this.selectStudent}
//                               copyReport={this.copyReport}
//                               handleClose={this.handleClose}
//                             />
//                           </div>
//                         </Modal>
//                       </div>

//     return (
//       <tr>
//         <td>第{ this.props.length - this.props.idx }次</td>
//         <td>{ this.props.report.course_date }</td>
//         <td>{ this.props.student.englishname }</td>
//         <td>{ this.props.student.age }</td>
//         <td>{ this.props.course_name }</td>
//         <td>
//           <Link to={`/reports/${this.props.report._id}/view`} target="_blank">
//             <i className="material-icons cyan-text clickable tooltipped" data-position="bottom" data-tooltip="查看反馈表">visibility</i>
//           </Link>
//         </td>
//         {
//           (this.props.course_status === "active" && !this.props.report.paid) ? <td><i className="material-icons blue-text clickable" onClick={this.editReport}>edit</i></td> : null
//         }
//         { 
//           this.props.course_status === "active" ? <td>{copyModal}</td> : null
//         }
//         { 
//           (this.props.course_status === "active" && !this.props.report.paid) ? <td><i className="material-icons red-text clickable" onClick={() => { if (window.confirm('确定要删除此反馈表?')) this.deleteReport()}}>delete</i></td> : null
//         }
//       </tr>
//     )
//   }
// }

// const mapStateToProps = (state) => {
//   return {
//     user_id: state.auth.user.userTokenData.id,
//     teacher_id: state.auth.identityData._id,
//     isSuccess: state.status.success,
//     student: state.studentsData.currentStudent,
//     course_name: state.coursesData.currentCourse.name,
//     course_status: state.coursesData.currentCourse.status,
//     courses: state.coursesData.courses.map(course => ({
//       id: course._id,
//       name: course.name,
//       level: course.level,
//       status: course.status,
//       students: course.students.map(student => ({
//         id: student._id,
//         englishname: student.englishname,
//         lastname: student.lastname,
//         firstname: student.firstname
//       }))
//     }))
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     copyReport: (current_student_id, course_id, student_id, teacher_id, report_id) => dispatch(copyReport(current_student_id, course_id, student_id, teacher_id, report_id)),
//     deleteReport: (report_id) => dispatch(deleteReport(report_id)),
//     editReport: (report, path) => dispatch(editReport(report, path))
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(ReportRow);