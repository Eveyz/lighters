import React from 'react';

import { getLocalTime } from '../../../ultis';

const Transaction = props => {
  let td = props.transaction.status === "IN" ? <td className="green-text bold">+{props.transaction.amount}</td> : <td className="red-text bold">-{props.transaction.amount}</td>

  return(
    <tr>
      <td>{getLocalTime(props.transaction.created_at)}</td>
      <td>{props.transaction.src}</td>
      <td>{props.transaction.dest}</td>
      {td}
      <td>{props.transaction.status === "IN" ? "收入" : "支出"}</td>
      <td className="text-overflow" style={{maxWidth: "200px"}}>{props.transaction.memo}</td>
    </tr>
  )
}

export default Transaction;