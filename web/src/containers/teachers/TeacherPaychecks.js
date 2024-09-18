import React, { useState, useEffect } from 'react'
import { Row, Col, Card } from 'react-materialize';
import axios from 'axios'

// import { getPaychecks } from '../../actions/paychecks_actions';
import TeacherPaycheckList from './TeacherPaycheckList';
import Loading from '../../components/Loading'

const TeacherPaychecks = props => {

  const [paychecks, setPaychecks] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    axios.get(`/paychecks?teacher_id=${props.teacher_id}`).then((response) => {
      setPaychecks(response.data)
      setIsLoading(false)
    }).catch((err) => {
      console.log(err)
    })
  }, [])

  if(isLoading) {
    return <Loading />
  }

  let paid = [],
      unpaid = [],
      paidSum = 0
  
  paychecks.forEach((pc, idx) => {
    if(pc.paid) {
      paid.push(pc)
      paidSum += pc.amount
    } else {
      unpaid.push(pc)
    }
  })
  let paidTable = paid.length > 0 ? <TeacherPaycheckList paychecks={paid} /> 
  : 
  <Row>
    <Col m={12} s={12}>
      <Card className='white r-box-shadow' textClassName='black-text' title=''>
      <h5 className="center">没有已付工资单</h5>
      </Card>
    </Col>
  </Row>;

  let unpaidTable = unpaid.length > 0 ? <TeacherPaycheckList paychecks={unpaid} />
  : 
  <Row>
    <Col m={12} s={12}>
      <Card className='white r-box-shadow' textClassName='black-text' title=''>
      <h5 className="center">没有待付工资单</h5>
      </Card>
    </Col>
  </Row>;

  return(
    <div>
      <h6 className="airbnb-font bold red-text">待付工资单</h6>
      {unpaidTable}
      <br/>
      <h6 className="airbnb-font bold green-text">已付工资单(总计: {paidSum.toFixed(2)}元)</h6>
      {paidTable}
    </div>
  )
}

export default TeacherPaychecks

// class TeacherPaychecks extends React.Component {
//   componentWillMount() {
//     this.props.getPaychecks(`?teacher_id=${this.props.teacher_id}`)
//   }

//   render() {
//     let paid = [],
//         unpaid = [],
//         paidSum = 0
    
//     this.props.paychecks.forEach((pc, idx) => {
//       if(pc.paid) {
//         paid.push(pc)
//         paidSum += pc.amount
//       } else {
//         unpaid.push(pc)
//       }
//     })
//     let paidTable = paid.length > 0 ? <TeacherPaycheckList paychecks={paid} /> 
//     : 
//     <Row>
//       <Col m={12} s={12}>
//         <Card className='white r-box-shadow' textClassName='black-text' title=''>
//         <h5 className="center">没有已付工资单</h5>
//         </Card>
//       </Col>
//     </Row>;

//     let unpaidTable = unpaid.length > 0 ? <TeacherPaycheckList paychecks={unpaid} />
//     : 
//     <Row>
//       <Col m={12} s={12}>
//         <Card className='white r-box-shadow' textClassName='black-text' title=''>
//         <h5 className="center">没有待付工资单</h5>
//         </Card>
//       </Col>
//     </Row>;

//     return(
//       <div>
//         <h6 className="airbnb-font bold red-text">待付工资单</h6>
//         {unpaidTable}
//         <br/>
//         <h6 className="airbnb-font bold green-text">已付工资单(总计: {paidSum.toFixed(2)}元)</h6>
//         {paidTable}
//       </div>
//     )
//   }
// }

// const mapStateToProps = (state) => {
//   return {
//     paychecks: state.paycheckData.paychecks,
//     teacher_id: state.auth.identityData._id,
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     getPaychecks: (query) => {
//       dispatch(getPaychecks(query))
//     }
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(TeacherPaychecks);