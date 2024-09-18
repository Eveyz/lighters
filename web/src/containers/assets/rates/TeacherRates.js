import React, { useState, useEffect } from 'react';
import { Row, Col, Card } from 'react-materialize';
import _ from 'lodash';
import axios from 'axios'

import { CLASS_TYPE_RANK, CLASS_LEVEL_RANK } from '../../../ultis';
import TeacherRateInputForm from './TeacherRateInputForm';
import Loading from '../../../components/Loading';

const TeacherRates = props => {

  const [isLoading, setIsLoading] = useState(true)
  const [rates, setRates] = useState([])
  const [teacherRate, setTeacherRate] = useState({})
  const [teachers, setTeachers] = useState([])
  const [show, setShow] = useState(false)
  const [action, setAction] = useState("NEW")

  useEffect(() => {
    async function fetData() {
      const _rates_res = await axios.get(`/teacher_rates`)
      const _teachers = await axios.get(`/teachers`)

      var _rates = _(_rates_res.data).chain().sortBy(function(tr) {
                      return CLASS_LEVEL_RANK[tr.course_level];
                    }).sortBy(function(tr) {
                      return CLASS_TYPE_RANK[tr.course_type];
                    }).sortBy(function(tr) {
                      return (tr.teacher_id.lastname + tr.teacher_id.firstname);
                    }).value()

      setRates(_rates)
      setTeachers(_teachers.data)
      setIsLoading(false)
    }
    fetData()
  }, [])

  const toggleEdit = (teacher_rate) => e => {
    setShow(true)
    setAction("EDIT")
    setTeacherRate(teacher_rate)
  }

  const toggleShow = () => {
    setShow(!show)
    setAction("NEW")
  }

  const cancel = () => {
    setShow(!show)
    setAction("NEW")
  }

  const onSubmit = teacher_rate => {
    if(teacher_rate) {
      if(action === "NEW") {
        axios.post(`/teacher_rates`, teacher_rate)
          .then((res) => {
            window.Materialize.toast('成功添加', 1000, 'green');
            let _rates = [...rates, res.data]
            _rates = _(_rates).chain().sortBy(function(tr) {
                      return CLASS_LEVEL_RANK[tr.course_level];
                    }).sortBy(function(tr) {
                      return CLASS_TYPE_RANK[tr.course_type];
                    }).sortBy(function(tr) {
                      return (tr.teacher_id.lastname + tr.teacher_id.firstname);
                    }).value()
            setRates(_rates)
            setTeacherRate(res.data)
            setShow(!show)
            setAction("NEW")
          })
          .catch((err) => {
            console.log(err)
          })
      } else { 
        let {_id, ..._teacher_rate} = teacher_rate
        axios.put(`/teacher_rates/${_id}`, _teacher_rate)
          .then((res) => {
            const idx = rates.findIndex(r => r._id === res.data._id)
            let _rates = [
              ...rates.slice(0, idx), // everything before current obj
              res.data,
              ...rates.slice(idx + 1), // everything after current obj
            ]
            setRates(_rates)
            setTeacherRate(res.data)
            setShow(!show)
            setAction("NEW")
            window.Materialize.toast('成功更新', 1000, 'green');
          })
          .catch((err) => {
            console.log(err)
          })
      }
    }
  }

  const deleteTeacherRate = (teacher_rate_id) => {
    axios.delete(`/teacher_rates/${teacher_rate_id}`)
    .then(res => {
      let _rates = rates.filter(r => r._id !== teacher_rate_id)
      setRates(_rates)
      window.Materialize.toast('删除成功', 1000, 'green')
    })
    .catch(err => {
      console.log(err)
    })
  }

  let showInput = show ? <TeacherRateInputForm action={action} teacher_rate={teacherRate} teachers={teachers} onSubmit={onSubmit} cancel={cancel} /> : ""
  let btn = show ? "" : <button className="btn" onClick={toggleShow}>新建条目</button>

  let teacherRatesList = ""
  let teacherRatesTable = ""
  if(rates.length > 0 && !show) {
    teacherRatesList = rates.map((teacher_rate, idx) => {
      return <tr key={idx}>
                <td>{teacher_rate.teacher_id.lastname}{teacher_rate.teacher_id.firstname}</td>
                <td>{teacher_rate.rate}</td>
                <td>{teacher_rate.course_type}</td>
                <td>{teacher_rate.course_level}</td>
                <td>{teacher_rate.teacher_id.level}级</td>
                <td>
                  <button className="btn cyan" onClick={toggleEdit(teacher_rate)}>编辑</button>
                </td>
                <td>
                  <button className="btn red" onClick={() => { if (window.confirm('确定要删除此条目?')) deleteTeacherRate(teacher_rate._id)}}>删除</button>
                </td>
              </tr>
    })
    teacherRatesTable = <table className="highlight">
                      <thead>
                        <tr>
                          <th>教师</th>
                          <th>工资(元/课时/学生)</th>
                          <th>课程类别</th>
                          <th>课程等级</th>
                          <th>教师等级</th>
                          <th>编辑</th>
                          <th>删除</th>
                        </tr>
                      </thead>

                      <tbody>
                        {teacherRatesList}
                      </tbody>
                    </table>
  }

  return(
    <Row>
      {
        isLoading ?
        <Loading />
        :
        <Col m={12} s={12}>
          <Card className='white r-box-shadow no-margin' textClassName='black-text' title=''>
            <h6 className="airbnb-font bold">教师课时费</h6>
            <hr/>
            <br/>
            {btn}
            {showInput}
            <br/>
            <br/>
            {teacherRatesTable}
          </Card>
        </Col>
      }
    </Row>
  )
}

export default TeacherRates

// class TeacherRates extends React.Component {
//   state = {
//     show: false,
//     action: "NEW",
//     teacher_rate: {}
//   }

//   componentWillMount() {
//     this.props.setLoadingStatus(true)
//     this.props.getTeacherRates()
//   }

//   componentDidMount() {
//     this.props.setLoadingStatus(false)
//   }

//   toggleEdit = (teacher_rate) => e => {
//     this.setState({show: true, action: "EDIT", teacher_rate: teacher_rate})
//   }

//   toggleShow = () => {
//     this.setState({show: !this.state.show, action: "NEW"})
//   }

//   onSubmit = teacher_rate => {
//     if(teacher_rate) {
//       this.state.action === "NEW" ? this.props.addTeacherRate(teacher_rate) : this.props.updateTeacherRate(teacher_rate)
//     }
//     this.setState({teacher_rate: {}, show: !this.state.show, action: "NEW"})
//   }

//   deleteTeacherRate = (teacher_rate_id) => {
//     this.props.deleteTeacherRate(teacher_rate_id)
//   }

//   render() {
//     if(this.props.isLoading) {
//       return <Loading />
//     }

//     let showInput = this.state.show ? <TeacherRateInputForm action={this.state.action} teacher_rate={this.state.teacher_rate} teachers={this.props.teachers} onSubmit={this.onSubmit} cancel={this.onSubmit} /> : ""
//     let btn = this.state.show ? "" : <button className="btn" onClick={this.toggleShow}>新建条目</button>

//     let teacherRatesList = ""
//     let teacherRatesTable = ""
//     if(this.props.teacher_rates.length > 0 && !this.state.show) {
//       teacherRatesList = this.props.teacher_rates.map((teacher_rate, idx) => {
//         return <tr key={idx}>
//                   <td>{teacher_rate.teacher_id.lastname}{teacher_rate.teacher_id.firstname}</td>
//                   <td>{teacher_rate.rate}</td>
//                   <td>{teacher_rate.course_type}</td>
//                   <td>{teacher_rate.course_level}</td>
//                   <td>{teacher_rate.teacher_id.level}级</td>
//                   <td>
//                     <button className="btn cyan" onClick={this.toggleEdit(teacher_rate)}>编辑</button>
//                   </td>
//                   <td>
//                     <button className="btn red" onClick={() => { if (window.confirm('确定要删除此条目?')) this.deleteTeacherRate(teacher_rate._id)}}>删除</button>
//                   </td>
//                </tr>
//       })
//       teacherRatesTable = <table className="highlight">
//                         <thead>
//                           <tr>
//                             <th>教师</th>
//                             <th>工资(元/课时/学生)</th>
//                             <th>课程类别</th>
//                             <th>课程等级</th>
//                             <th>教师等级</th>
//                             <th>编辑</th>
//                             <th>删除</th>
//                           </tr>
//                         </thead>

//                         <tbody>
//                           {teacherRatesList}
//                         </tbody>
//                       </table>
//     }

//     return(
//       <Row>
//         <Col m={12} s={12}>
//           <Card className='white r-box-shadow no-margin' textClassName='black-text' title=''>
//             <h6 className="airbnb-font bold">教师课时费</h6>
//             <hr/>
//             <br/>
//             {btn}
//             {showInput}
//             <br/>
//             <br/>
//             {teacherRatesTable}
//           </Card>
//         </Col>
//       </Row>
//     )
//   }
// }

// const mapStateToProps = state => {
//   return {
//     isLoading: state.status.loading,
//     teacher_rates: _(state.teacherRatesData.teacherRates).chain().sortBy(function(tr) {
//                       return CLASS_LEVEL_RANK[tr.course_level];
//                     }).sortBy(function(tr) {
//                       return CLASS_TYPE_RANK[tr.course_type];
//                     }).sortBy(function(tr) {
//                       return (tr.teacher_id.lastname + tr.teacher_id.firstname);
//                     }).value(),
//     teachers: state.teachersData.teachers.map(teacher => {
//       return {id: teacher._id, name: teacher.englishname, firstname: teacher.firstname, lastname: teacher.lastname}
//     })
//   };
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     setLoadingStatus: (isLoading) => {
//       dispatch(setLoadingStatus(isLoading))
//     },
//     getTeacherRates: (query) => {
//       dispatch(getTeacherRates(query))
//     },
//     addTeacherRate: (teacher_rate) => {
//       dispatch(addTeacherRate(teacher_rate))
//     },
//     updateTeacherRate: (teacher_rate) => {
//       dispatch(updateTeacherRate(teacher_rate))
//     },
//     deleteTeacherRate: (teacher_rate_id) => {
//       dispatch(deleteTeacherRate(teacher_rate_id))
//     }
//   };
// }

// export default connect(mapStateToProps, mapDispatchToProps)(TeacherRates);