import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Row, Col, Card } from 'react-materialize'

// import { sortTransactionsByDate } from '../../../ultis'
import TransactionForm from './TransactionForm'
import TransactionList from './TransactionList'
import Loading from '../../../components/Loading'

const Transactions = props => {

  const [isLoading, setIsLoading] = useState(true)
  const [mode, setMode] = useState("TRANSACTION_LIST")
  const [transactions, setTransactions] = useState([])
  const [total, setTotal] = useState(0)
  const [sum, setSum] = useState(0)
  const [page, setPage] = useState(0)
  const [perPage, setPerPage] = useState(10)

  const fetchData = async (skip, limit) => {
    const transactions_res = await axios.get(`/transactions/all?skip=${skip}&limit=${limit}`)
    let ts = transactions_res.data
    setTransactions(ts['transactions'])
    setTotal(ts['total'])
    setIsLoading(false)
  }

  useEffect(() => {
    async function fetData(skip, limit) {
      const transactions_res = await axios.get(`/transactions/all?skip=${skip}&limit=${limit}`)
      let ts = transactions_res.data
      setTransactions(ts['transactions'])
      setTotal(ts['total'])
      setSum(ts['sum'])
      setIsLoading(false)
    }
    fetData(0, 10)
  }, [])

  const addMode = () => {
    setMode("TRANSACTION_ADD")
  }

  const cancel = () => {
    setMode("TRANSACTION_LIST")
  }

  const addTransaction = (transaction) => {
    axios.post(`/transactions`, transaction).then(res => {
      setTransactions([...transactions, res.data])
    })
    .catch(e => {
      console.log(e)
    })
  }

  const changePage = async (skip) => {
    setPage(skip)
    await fetchData(skip, perPage)
  }

  const changePerPage = async (limit) => {
    setPerPage(limit)
    setPage(0)
    await fetchData(0, limit)
  }

  if(isLoading) {
    return <Loading />
  }

  let content = ""

    switch (mode) {
      case "TRANSACTION_ADD":
        content = <TransactionForm transaction={{}} addTransaction={addTransaction} cancel={cancel} />
        break;
      case "TRANSACTION_EDIT":
        // content = <TransactionForm transaction={this.props.transaction} />
        break;
      case "TRANSACTION_LIST":
        content = transactions.length > 0 ? <TransactionList total={total} page={page} perPage={perPage} changePage={changePage} changePerPage={changePerPage} transactions={transactions} /> : <h6 className="airbnb-font bold">当前没有交易明细</h6>
        break;
      default:
        break;
    }

    let header = mode === "TRANSACTION_LIST" ? 
                <div>
                  <h5 className="airbnb-font bold">总计: <span className={sum > 0 ? "green-text" : "red-text"}>{sum.toFixed(2)}</span>元</h5>
                  <br/>
                  <button className="btn" onClick={addMode}>增加条目</button>
                  <br/>
                  <br/>
                </div> : ""

  return (
    <Row>
      <Col m={12} s={12}>
        <Card className='white r-box-shadow no-margin' textClassName='black-text' title=''>
          {header}
          {content}
          <br/>
        </Card>
      </Col>
    </Row>
  )
}

export default Transactions

// class Transactions extends React.Component {

//   componentWillMount() {
//     this.props.setLoadingStatus(true)
//     this.props.setMode("TRANSACTION_LIST")
//     this.props.getTransactions(`?`)
//     this.props.getPaychecks(`?paid=${true}`)
//   }

//   componentDidMount() {
//     this.props.setLoadingStatus(false)
//   }

//   setMode = () => {
//     this.props.setMode("TRANSACTION_ADD")
//   }

//   render() {
//     if(this.props.isLoading) {
//       return <Loading />
//     }

//     let content = ""

//     switch (this.props.mode) {
//       case "TRANSACTION_ADD":
//         content = <TransactionForm transaction={{}} />
//         break;
//       case "TRANSACTION_EDIT":
//         // content = <TransactionForm transaction={this.props.transaction} />
//         break;
//       case "TRANSACTION_LIST":
//         content = this.props.transactions.length > 0 ? <TransactionList transactions={sortTransactionsByDate(this.props.transactions)} /> : <h6 className="airbnb-font bold">当前没有交易明细</h6>
//         break;
//       default:
//         break;
//     }

//     let sum = 0
//     if(this.props.transactions.length > 0) {
//       this.props.transactions.forEach((t, idx) => {
//         if(t.status === "IN") sum += t.amount
//         else sum -= t.amount
//       })
//     }

//     let header = this.props.mode === "TRANSACTION_LIST" ? 
//                 <div>
//                   <h5 className="airbnb-font bold">总计: <span className={sum > 0 ? "green-text" : "red-text"}>{sum.toFixed(2)}</span>元</h5>
//                   <br/>
//                   <button className="btn" onClick={this.setMode}>增加条目</button>
//                   <br/>
//                   <br/>
//                 </div> : ""

//     return(
//       <Row>
//         <Col m={12} s={12}>
//           <Card className='white r-box-shadow no-margin' textClassName='black-text' title=''>
//             {header}
//             {content}
//             <br/>
//           </Card>
//         </Col>
//       </Row>
//     )
//   }
// }

// const mapStateToProps = state => {

//   let _transactions = state.transactionsData.transactions
//   let paychecks = []
//   state.paycheckData.paychecks.forEach((pc, idx) => {
//     if(pc.amount !== 0) {
//       paychecks.push({
//         src: 'Lighters',
//         dest: pc.teacher_id.lastname + pc.teacher_id.firstname,
//         amount: pc.amount ? pc.amount.toFixed(2) : 0,
//         created_at: pc.updated_at,
//         status: "OUT",
//         memo: pc.memo
//       })
//     }
//   })
//   if(paychecks.length > 0) _transactions = [...state.transactionsData.transactions, ...paychecks]

//   return {
//     auth: state.auth,
//     // transaction: state.transactionsData.transaction,
//     isLoading: state.status.loading,
//     transactions: _transactions,
//     mode: state.mode.value,
//   };
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     setLoadingStatus: (isLoading) => {
//       dispatch(setLoadingStatus(isLoading))
//     },
//     setMode: (mode) => {
//       dispatch(setMode(mode))
//     },
//     getTransactions: (query) => {
//       dispatch(getTransactions(query))
//     },
//     getPaychecks: (query) => {
//       dispatch(getPaychecks(query))
//     }
//   };
// }
