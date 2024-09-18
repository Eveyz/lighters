import React from 'react'

import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'

const ProfitRow = props => {
  return (
    <TableRow hover tabIndex={-1}>
      {props.columns.map((column) => {
        var value
        switch (column.label) {
          case '课程':
            value = props.row[column.id].name
            break
          case '教师':
            value = props.row[column.id].englishname
            break
          case '学生':
              value = props.row[column.id].englishname
              break
          case '盈利(元)':
            value = props.profit
            break
          default:
            value = props.row[column.id]
            break
        }
        const m = props.profit > 0 ? <span className="green-text">{props.profit.toFixed(2)}</span> : <span className="red-text">{props.profit.toFixed(2)}</span>
        return (
          <TableCell key={column.id} align={column.align}>
            {column.label === "盈利(元)" ? m : value}
          </TableCell>
        )
      })}
    </TableRow>
  )
}

export default ProfitRow