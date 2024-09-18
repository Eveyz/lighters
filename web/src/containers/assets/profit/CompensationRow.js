import React from 'react'

import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'

const CompensationRow = props => {
  return (
    <TableRow hover tabIndex={-1}>
      {props.columns.map((column) => {
        var value
        switch (column.id) {
          case 'amount':
            value = props.amount
            break
          default:
            value = props.row[column.id]
            break
        }
        const m = <span className={props.cls}>{props.amount}</span>
        return (
          <TableCell key={column.id} align={column.align}>
            {column.id === "amount" ? m : value}
          </TableCell>
        )
      })}
    </TableRow>
  )
}

export default CompensationRow