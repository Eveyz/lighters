import React, { useEffect, useState } from 'react'
import { Row, Col, Card } from 'react-materialize'
import { Link } from 'react-router-dom'
import axios from 'axios'

import TuitionInputForm from './TuitionInputForm'
import Loading from '../../../components/Loading'
import { getLocalTime } from '../../../ultis'

const tuitions = props => {

  const [isLoading, setIsLoading] = useState(true)
  const [show, setShow] = useState(false)
  const [tuitions, setTuitions] = useState([])
  const [tuition, setTuition] = useState({})
  const [students, setStudents] = useState([])
  const [lowBalancers, setLowBalancers] = useState([])
  const [action, setAction] = useState("NEW")

  useEffect(() => {

    async function fetData() {
      const tuitions_res = await axios.get(`/tuitions`)
      const students_res = await axios.get(`/students/low_balance`)
      
      setTuitions(tuitions_res.data)
      setStudents(students_res.data.students)
      setLowBalancers(students_res.data.lowBalanceStudents)
      setIsLoading(false)
    }

    fetData()

  }, [])

  if(isLoading) return <Loading />

  const toggleEdit = (tuition) => e => {
    setShow(true)
    setAction("EDIT")
    setTuition(tuition)
  }

  const toggleShow = () => {
    setShow(!show)
    setAction("NEW")
  }

  const addTuition = tuition => {
    axios.post(`/tuitions`, tuition)
      .then(res => {
        setTuitions([...tuitions, res.data.tuition])
        window.Materialize.toast('成功添加', 1000, 'green');
      })
      .catch((err) => {
        window.Materialize.toast('添加失败', 1000, 'red')
      })
  }

  const updateTuition = tuition => {
    let {_id, ..._tuition} = tuition
    axios.put(`/tuitions/${_id}`, _tuition)
      .then((response) => {
        const idx = tuitions.findIndex(tuition => tuition._id === response.data.tuition._id);
        setTuitions([...tuitions.slice(0, idx), response.data.tuition, ...tuitions.slice(idx + 1)])
        window.Materialize.toast('成功更新', 1000, 'green')
      })
      .catch((err) => {
        window.Materialize.toast('更新失败', 1000, 'red')
      })
  }

  const deleteTuition = (tuition_id) => {
    axios.delete(`/tuitions/${tuition_id}`)
      .then((response) => {
        setTuitions(tuitions.filter(tuition => tuition._id !== tuition_id))
        setLowBalancers(response.data)
        window.Materialize.toast('成功删除', 1000, 'green');
      })
      .catch((err) => {
        window.Materialize.toast('删除失败', 1000, 'red')
      })
  }

  const onSubmit = tuition => {
    if(tuition) {
      action === "NEW" ? addTuition(tuition) : updateTuition(tuition)
    }
    setShow(!show)
    setAction("NEW")
    setTuition({})
  }

  let showInput = show ? <TuitionInputForm action={action} tuition={tuition} students={students} onSubmit={onSubmit} cancel={onSubmit} /> : ""
  let btn = show ? "" : <button className="btn" onClick={toggleShow}>新建条目</button>

  let tuitionsList = ""
  let tuitionsTable = ""
  if(tuitions.length > 0 && !show) {
    tuitionsList = tuitions.map((tuition, idx) => {
      return <tr key={idx}>
                <td>
                  <Link target="_blank" to={`/students/${tuition.student_id._id}/view`}>
                    <span className="airbnb-font">
                      {
                        tuition.student_id.lastname ? 
                        `${tuition.student_id.lastname + tuition.student_id.firstname}(${tuition.student_id.englishname})`
                        :
                        tuition.student_id.englishname
                      }
                    </span>
                  </Link>
                </td>
                <td>{tuition.amount.toFixed(2)}</td>
                <td>{getLocalTime(tuition.created_at)}</td>
                <td>
                  <button className="btn cyan" onClick={toggleEdit(tuition)}>编辑</button>
                </td>
                <td>
                  <button className="btn red" onClick={() => { if (window.confirm('确定要删除此条目?')) deleteTuition(tuition._id)}}>删除</button>
                </td>
              </tr>
    })
    tuitionsTable = <table className="highlight">
                      <thead>
                        <tr>
                          <th>学生</th>
                          <th>总额(元)</th>
                          <th>时间</th>
                          <th>编辑</th>
                          <th>删除</th>
                        </tr>
                      </thead>

                      <tbody>
                        {tuitionsList}
                      </tbody>
                    </table>
  }

  let studentsList = ""
  let studentsTable = <p>暂时还没有学生需要缴费</p>
  if(lowBalancers.length > 0) {
    studentsList = lowBalancers.map((student, idx) => {
      return <tr key={idx}>
                <td><Link target="_blank" to={`/students/${student._id}/view`}><span className="airbnb-font">{student.lastname + student.firstname}({student.englishname})</span></Link></td>
                <td className="red-text">{student.tuition_amount.toFixed(2)}</td>
              </tr>
    })
    studentsTable = <table className="highlight">
                      <thead>
                        <tr>
                          <th>学生</th>
                          <th>余额(元)</th>
                        </tr>
                      </thead>

                      <tbody>
                        {studentsList}
                      </tbody>
                    </table>
  }

  return (
    <Row>
      <Col m={12} s={12}>
        <Card className='white r-box-shadow no-margin' textClassName='black-text' title=''>
          <h6 className="airbnb-font bold">需要提醒缴费的学生</h6>
          <hr/>
          {studentsTable}
          <br/>
          <h6 className="airbnb-font bold">学生已缴学费</h6>
          <hr/>
          {btn}
          {showInput}
          <br/>
          <br/>
          {tuitionsTable}
        </Card>
      </Col>
    </Row>
  )
}

export default tuitions

// class Tuitions extends React.Component {
//   state = {
//     show: false,
//     action: "NEW",
//     tuition: {}
//   }

//   componentWillMount() {
//     this.props.setLoadingStatus(true)
//     this.props.getTuitions()
//     this.props.getStudentsWithLowBalance()
//   }

//   componentDidMount() {
//     this.props.setLoadingStatus(false)
//   }

//   toggleEdit = (tuition) => e => {
//     this.setState({show: true, action: "EDIT", tuition: tuition})
//   }

//   toggleShow = () => {
//     this.setState({show: !this.state.show, action: "NEW"})
//   }

//   onSubmit = tuition => {
//     if(tuition) {
//       this.state.action === "NEW" ? this.props.addTuition(tuition) : this.props.updateTuition(tuition)
//     }
//     this.setState({tuition: {}, show: !this.state.show, action: "NEW"})
//   }

//   deleteTuition = (tuition_id) => {
//     this.props.deleteTuition(tuition_id)
//   }

//   render() {
//     if(this.props.isLoading) {
//       return <Loading />
//     }

//     let showInput = this.state.show ? <TuitionInputForm action={this.state.action} tuition={this.state.tuition} students={this.props.students} onSubmit={this.onSubmit} cancel={this.onSubmit} /> : ""
//     let btn = this.state.show ? "" : <button className="btn" onClick={this.toggleShow}>新建条目</button>

//     let tuitionsList = ""
//     let tuitionsTable = ""
//     if(this.props.tuitions.length > 0 && !this.state.show) {
//       tuitionsList = this.props.tuitions.map((tuition, idx) => {
//         return <tr key={idx}>
//                   <td><Link target="_blank" to={`/students/${tuition.student_id._id}/view`}><span className="airbnb-font">{tuition.student_id.englishname}</span></Link></td>
//                   <td>{tuition.amount.toFixed(2)}</td>
//                   <td>
//                     <button className="btn cyan" onClick={this.toggleEdit(tuition)}>编辑</button>
//                   </td>
//                   <td>
//                     <button className="btn red" onClick={() => { if (window.confirm('确定要删除此条目?')) this.deleteTuition(tuition._id)}}>删除</button>
//                   </td>
//                </tr>
//       })
//       tuitionsTable = <table className="highlight">
//                         <thead>
//                           <tr>
//                             <th>学生</th>
//                             <th>总额(元)</th>
//                             <th>编辑</th>
//                             <th>删除</th>
//                           </tr>
//                         </thead>

//                         <tbody>
//                           {tuitionsList}
//                         </tbody>
//                       </table>
//     }

//     let studentsList = ""
//     let studentsTable = <p>暂时还没有学生需要缴费</p>
//     if(this.props.lowBalanceStudents.length > 0) {
//       studentsList = this.props.lowBalanceStudents.map((student, idx) => {
//         return <tr key={idx}>
//                   <td><Link target="_blank" to={`/students/${student.id}/view`}><span className="airbnb-font">{student.name}</span></Link></td>
//                   <td className="red-text">{student.tuition_amount.toFixed(2)}</td>
//                </tr>
//       })
//       studentsTable = <table className="highlight">
//                         <thead>
//                           <tr>
//                             <th>学生</th>
//                             <th>余额(元)</th>
//                           </tr>
//                         </thead>

//                         <tbody>
//                           {studentsList}
//                         </tbody>
//                       </table>
//     }

//     return(
//       <Row>
//         <Col m={12} s={12}>
//           <Card className='white r-box-shadow no-margin' textClassName='black-text' title=''>
//             <h6 className="airbnb-font bold">需要提醒缴费的学生</h6>
//             <hr/>
//             {studentsTable}
//             <br/>
//             <h6 className="airbnb-font bold">学生已缴学费</h6>
//             <hr/>
//             {btn}
//             {showInput}
//             <br/>
//             <br/>
//             {tuitionsTable}
//           </Card>
//         </Col>
//       </Row>
//     )
//   }
// }

// const mapStateToProps = state => {
//   return {
//     auth: state.auth,
//     isLoading: state.status.loading,
//     tuitions: state.tuitionsData.tuitions,
//     students: state.studentsData.students.map(student => {
//       return {id: student._id, name: student.englishname, firstname: student.firstname, lastname: student.lastname, tuition_amount: student.tuition_amount}
//     }),
//     lowBalanceStudents: state.studentsData.lowBalanceStudents.map(student => {
//       return {id: student._id, name: student.englishname, firstname: student.firstname, lastname: student.lastname, tuition_amount: student.tuition_amount}
//     }),
//   };
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     setLoadingStatus: (isLoading) => {
//       dispatch(setLoadingStatus(isLoading))
//     },
//     getTuitions: (query) => {
//       dispatch(getTuitions(query))
//     },
//     getStudentsWithLowBalance: () => {
//       dispatch(getStudentsWithLowBalance())
//     },
//     addTuition: (tuition) => {
//       dispatch(addTuition(tuition))
//     },
//     updateTuition: (tuition) => {
//       dispatch(updateTuition(tuition))
//     },
//     deleteTuition: (tuition_id) => {
//       dispatch(deleteTuition(tuition_id))
//     }
//   };
// }
