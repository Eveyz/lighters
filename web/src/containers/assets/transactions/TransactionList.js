import React from 'react'
// import MaterialTable from 'material-table'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'

import { getLocalTime } from '../../../ultis'

const columns = [
  { id: 'created_at', label: '时间', minWidth: 170, format: (value) => getLocalTime(value), },
  { id: 'src', label: '从', minWidth: 100 },
  { id: 'dest', label: '到', minWidth: 100 },
  { id: 'amount', label: '金额(元)', minWidth: 100 },
  { id: 'status', label: '状态', minWidth: 100 },
  { id: 'memo', label: '备忘录', minWidth: 200 },
]

const TransactionList = props => {

  const handleChangePage = (event, newPage) => {
    props.changePage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    props.changePerPage(event.target.value)
  }

  return(
    <div>
      <h6 className="airbnb-font bold">支出明细列表</h6>
      <hr/>

      <TableContainer>
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
            {props.transactions.map((transaction, idx) => {
              return (
                <TableRow hover tabIndex={-1} key={idx}>
                  {columns.map((column) => {
                    const value = transaction[column.id]
                    const m = transaction.status === "IN" ? <span className="green-text bold">+{transaction.amount}</span> : <span className="red-text bold">-{transaction.amount}</span>
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format ? column.format(value) : column.id === "amount" ? m : value}
                      </TableCell>
                    )
                  })}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={props.total}
        rowsPerPage={props.perPage}
        page={props.page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  )
}

export default TransactionList