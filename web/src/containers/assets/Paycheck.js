import React from 'react'

// import { setMode } from '../../actions/mode_action'
// import { selectPaycheck } from '../../actions/paychecks_actions';
// import { getTeacherData } from '../../actions/teachers_actions';

const Paycheck = props => {

  const checkPaycheck = () => {
    props.selectTeacher(props.paycheck.teacher_id)
    props.back("VIEW_MONTHLY")
    // props.selectPaycheck(props.paycheck)
    // props.selectPaycheck(props.paycheck)
    props.viewPaycheck(props.paycheck)
  }

  let paid = props.paycheck.paid ? <td className="airbnb-font bold green-text">已结算</td> : <td className="airbnb-font bold red-text">未结算</td>

  return(
    <tr className="clickable" onClick={checkPaycheck}>
      <td>{props.paycheck.month}</td>
      <td>{props.paycheck.teacher_id.lastname + props.paycheck.teacher_id.firstname}</td>
      <td>{props.paycheck.reports.length}</td>
      {paid}
    </tr>
  )
}

export default Paycheck

// class Paycheck extends React.Component {
//   constructor(props) {
//     super(props)

//     this.checkPaycheck = this.checkPaycheck.bind(this)
//   }
  
//   checkPaycheck() {
//     this.props.getTeacher(this.props.paycheck.teacher_id._id)
//     this.props.setMode("VIEW_MONTHLY")
//     this.props.selectPaycheck(this.props.paycheck)
//     this.props.viewPaycheck(this.props.paycheck)
//   }

//   render() {
//     let paid = this.props.paycheck.paid ? <td className="airbnb-font bold green-text">已结算</td> : <td className="airbnb-font bold red-text">未结算</td>
//     return(
//       <tr className="clickable" onClick={this.checkPaycheck}>
//         <td>{this.props.paycheck.month}</td>
//         <td>{this.props.paycheck.teacher_id.lastname + this.props.paycheck.teacher_id.firstname}</td>
//         <td>{this.props.paycheck.reports.length}</td>
//         {paid}
//       </tr>
//     )
//   }
// }

// // const mapStateToProps = state => {
// //   return {
    
// //   };
// // }

// const mapDispatchToProps = dispatch => {
//   return {
//     setMode: (mode) => {
//       dispatch(setMode(mode))
//     },
//     getTeacher: (teacher_id) => {
//       dispatch(getTeacherData(teacher_id))
//     },
//     selectPaycheck: (paycheck) => {
//       dispatch(selectPaycheck(paycheck))
//     }
//   };
// }

// export default connect(null, mapDispatchToProps)(Paycheck)