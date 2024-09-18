import React from 'react';

import Paycheck from './Paycheck';

const PaycheckList = props => {

  const viewPaycheck = (paycheck) => e => {
    props.viewPaycheck(paycheck)
  }

  let paychecksContent = <h6 className="center airbnb-font bold green-text">全部工资单已经结算</h6>
  if(props.paychecks.length > 0) {
    let paycheckList = props.paychecks.map((paycheck, idx) => {
      return <Paycheck
                key={idx}
                paycheck={paycheck}
                viewPaycheck={viewPaycheck(paycheck)}
                back={props.back}
                selectTeacher={props.selectTeacher}
              />
    });
    
    paychecksContent = <table className="highlight">
                        <thead>
                          <tr>
                            <th>月份</th>
                            <th>教师</th>
                            <th>反馈表数量</th>
                            <th>状态</th>
                          </tr>
                        </thead>

                        <tbody>
                          {paycheckList}
                        </tbody>
                      </table>
  }
  return(
    <div>
      {paychecksContent}
    </div>
  )
}

export default PaycheckList

// class PaycheckList extends React.Component {
//   viewPaycheck = (paycheck) => {
//     this.props.viewPaycheck(paycheck)
//   }

//   render() {
//     let paychecksContent = <h6 className="center airbnb-font bold green-text">全部工资单已经结算</h6>
//     if(this.props.paychecks.length > 0) {
//       let paycheckList = this.props.paychecks.map((paycheck, idx) => {
//         return <Paycheck
//                   key={idx}
//                   paycheck={paycheck}
//                   viewPaycheck={this.viewPaycheck(paycheck)}
//                   back={this.props.back}
//                 />
//       });
      
//       paychecksContent = <table className="highlight">
//                           <thead>
//                             <tr>
//                               <th>月份</th>
//                               <th>教师</th>
//                               <th>反馈表数量</th>
//                               <th>状态</th>
//                             </tr>
//                           </thead>

//                           <tbody>
//                             {paycheckList}
//                           </tbody>
//                         </table>
//     }
//     return(
//       <div>
//         {paychecksContent}
//       </div>
//     )
//   }
// }

// export default PaycheckList