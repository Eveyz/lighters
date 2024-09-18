import React from 'react'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

import ProfitRow from './ProfitRow'
import { getStudentReportCredit } from '../../../ultis'

const columns = [
  { id: 'course_id', label: '课程', minWidth: 170 },
  { id: 'course_date', label: '课程时间', minWidth: 100 },
  { id: 'teacher_id', label: '教师', minWidth: 100 },
  { id: 'student_id', label: '学生', minWidth: 100 },
  { id: 'profit', label: '盈利(元)', minWidth: 100, format: (value) => value.toFixed(2), },
]

const ProfitList = props => {

  let profitTable = <div className="col m12">
                      <div className="card white r-box-shadow">
                        <div className="card-content">
                          <h4 className="center">当前没有反馈表</h4>
                        </div>
                      </div>
                    </div>

  if(props.rows.length > 0) {
    profitTable = <TableContainer>
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
                        {props.rows.map((report, idx) => {
                          const report_credit = getStudentReportCredit(report.situation)
                          if(report_credit > 0) {
                            const profit = report.course_id.course_rate * report_credit - report.amount
                            const cls = profit > 0 ? "green-text" : "red-text"
                            return <ProfitRow key={idx} columns={columns} cls={cls} row={report} profit={profit} />
                          }
                          return null
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
  }

  return (
    <div>
      <h6 className="airbnb-font bold">所有反馈表</h6>
      <hr/>
      {profitTable}
    </div>
  )
}

export default ProfitList