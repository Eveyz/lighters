import React from 'react'

import TablePagination from '@material-ui/core/TablePagination'

const PaginationTable = props => {

  const handleChangePage = (event, newPage) => {
    props.handleChangePage(newPage, props.type)
  }

  const handleChangeRowsPerPage = (event) => {
    props.handleChangeRowsPerPage(event.target.value, props.type)
  }

  const { children } = props
  const childrenWithProps = React.Children.map(children, child =>
    React.cloneElement(child, { rows: props.rows })
  )

  return (
    <div>
      {childrenWithProps}
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={props.total}
        rowsPerPage={props.limit}
        page={props.skip}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  )
}

export default PaginationTable