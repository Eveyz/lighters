import React from 'react'
import CompensationRow from './CompensationRow'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

const columns = [
  { id: 'type', label: '类型', minWidth: 100 },
  { id: 'amount', label: '金额(元)', minWidth: 100 },
  { id: 'memo', label: '备忘录', minWidth: 170 },
]

const CompensationList = props => {

  let compensationTable = <div className="col m12">
                      <div className="card white r-box-shadow">
                        <div className="card-content">
                          <h4 className="center">当前没有反馈表</h4>
                        </div>
                      </div>
                    </div>

  if(props.rows.length > 0) {
    compensationTable = <TableContainer>
                          <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                              <TableRow>
                                {columns.map((column) => (
                                  <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                  >
                                    <b>{column.label}</b>
                                  </TableCell>
                                ))}
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {props.rows.map((compensation, idx) => {
                                let cls = "red-text"
                                let _amount = `-${compensation.amount.toFixed(2)}`
                                if(compensation.type === "罚款") {
                                  cls = "green-text"
                                  _amount = `${compensation.amount.toFixed(2)}`
                                }
                                return <CompensationRow key={idx} columns={columns} cls={cls} row={compensation} amount={_amount} />
                              })}
                            </TableBody>
                          </Table>
                        </TableContainer>
  }

  return (
    <div>
      <h6 className="airbnb-font bold">补助或者罚款列表</h6>
      <hr/>
      {compensationTable}
    </div>
  )
}

export default CompensationList

// class CompensationList extends React.Component {
//   render() {
//     let compensationList = ""
//     let compensationTable = <div className="col m12">
//                         <div className="card white r-box-shadow">
//                           <div className="card-content">
//                             <h4 className="center">当前没有补助或者罚款</h4>
//                           </div>
//                         </div>
//                       </div>
//     if(this.props.data.length > 0) {
//       compensationList = this.props.data.map((compensation, idx) => {
//         let cls = "red-text"
//         let _amount = `-${compensation.amount.toFixed(2)}`
//         if(compensation.type === "罚款") {
//           cls = "green-text"
//           _amount = `${compensation.amount.toFixed(2)}`
//         }
//         return <tr key={idx}>
//                 <td>{compensation.type}</td>
//                 <td className={cls}>{_amount}</td>
//                 <td>{compensation.memo}</td>
//               </tr>
//       })
//       compensationTable = <table className="highlight">
//                         <thead>
//                           <tr>
//                             <th>类型</th>
//                             <th>金额(元)</th>
//                             <th>备忘录</th>
//                           </tr>
//                         </thead>

//                         <tbody>
//                           {compensationList}
//                         </tbody>
//                       </table>
//     }
    

//     return (
//       <div>
//         <h6 className="airbnb-font bold">补助或者罚款列表</h6>
//         <hr/>
//         {compensationTable}
//       </div>
//     )
//   }
// }

// export default CompensationList;