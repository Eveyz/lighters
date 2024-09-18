import React, { useEffect, useState } from 'react'
import { Row, Col, Card } from 'react-materialize'
import axios from 'axios'

import PaginationTable from '../../PaginationTable'
import ProfitList from './ProfitList'
import CompensationList from './CompensationList'
import Loading from '../../../components/Loading'
// import { getStudentReportCredit } from '../../../ultis'

const Profit = props => {

  const [isLoading, setIsLoading] = useState(true)
  const [reports, setReports] = useState([])
  const [profit, setProfit] = useState(0)
  const [rlen, setRlen] = useState(0)   // all reports length
  const [rSkip, setrSkip] = useState(0)
  const [rLimit, setrLimit] = useState(10)
  const [compensations, setCompensations] = useState([])
  const [cLen, setClen] = useState(0)   // all compensations length
  const [cSkip, setcSkip] = useState(0)
  const [cLimit, setcLimit] = useState(10)

  useEffect(() => {
    async function fetData() {
      const profit_res = await axios.get(`/admin/profit?skip=0&limit=10`)
      let _profit = profit_res.data
      setProfit(_profit['profit'])
      setReports(_profit['reports'])
      setRlen(_profit['reports_length'])
      setCompensations(_profit['compensations'])
      setClen(_profit['compensations_length'])
      setIsLoading(false)
    }
    fetData()
  }, [])

  const fetchDataSkip = (field, skip) => {
    let url = field === "reports" ? `/reports?skip=${skip}&limit=${rLimit}` : `/compensations?skip=${skip}&limit=${cLimit}`
    axios.get(url)
    .then(res => {
      field === "reports" ? setReports(res.data) : setCompensations(res.data)
    })
    .catch(err => {
      console.log(err)
    })
  }

  const fetchDataLimit = (field, limit) => {
    let url = field === "reports" ? `/reports?skip=${rSkip}&limit=${limit}` : `/compensations?skip=${cSkip}&limit=${limit}`
    axios.get(url)
    .then(res => {
      field === "reports" ? setReports(res.data) : setCompensations(res.data)
    })
    .catch(err => {
      console.log(err)
    })
  }

  const handleChangePage = (skip, field) => {
    field === "reports" ? setrSkip(skip) : setcSkip(skip)
    fetchDataSkip(field, skip)
  }
  
  const handleChangeRowsPerPage = (limit, field) => {
    field === "reports" ? setrLimit(limit) : setcLimit(limit)
    field === "reports" ? setrSkip(0) : setcSkip(0)
    fetchDataLimit(field, limit)
  }

  if(isLoading) {
    return <Loading />
  }

  let reportContent = <div className="col m12">
                      <div className="card white r-box-shadow">
                        <div className="card-content">
                          <h4 className="center">当前没有反馈表</h4>
                        </div>
                      </div>
                    </div>
  if(reports.length > 0) {
    // reports.forEach((report, idx) => {
    //   const report_credit = getStudentReportCredit(report.situation)
    //   if(report_credit > 0) {
    //     sum += (report.course_id.course_rate * report_credit - report.amount)
    //   }
    // })
    reportContent = <PaginationTable 
                      rows={reports} 
                      handleChangePage={handleChangePage} 
                      handleChangeRowsPerPage={handleChangeRowsPerPage} 
                      skip={rSkip} 
                      limit={rLimit}
                      total={rlen}
                      type="reports"
                    >
                      <ProfitList />
                    </PaginationTable>
  }

  let compensationContent = <h4 className="center">当前没有补助或者罚款</h4>
  if(compensations.length > 0) {
    // compensations.forEach((compensation, idx) => {
    //   if(compensation.type === "罚款") sum += compensation.amount
    //   else sum -= compensation.amount
    // })
    compensationContent = <PaginationTable 
                            rows={compensations} 
                            handleChangePage={handleChangePage} 
                            handleChangeRowsPerPage={handleChangeRowsPerPage}
                            skip={cSkip}
                            limit={cLimit}
                            total={cLen}
                            type="compensations"
                          >
                            <CompensationList />
                          </PaginationTable>
  }

  return (
    <Row>
      <Col m={12} s={12}>
        <Card className='white r-box-shadow no-margin' textClassName='black-text' title=''>
          <h5 className="airbnb-font bold">当前盈利: <span className={profit > 0 ? "green-text" : "red-text"}>{profit.toFixed(2)}</span>元</h5>
          <hr/>
          <br/>
          {reportContent}
          <br/>
          {compensationContent}
        </Card>
      </Col>
    </Row>
  )
}

export default Profit

// class Profit extends React.Component {
  
//   componentWillMount() {
//     this.props.setLoadingStatus(true)
//     this.props.getAllReports()
//     this.props.getCompensations()
//   }

//   componentDidMount() {
//     this.props.setLoadingStatus(false)
//   }

//   render() {
//     if(this.props.isLoading) {
//       return <Loading />
//     }
//     // profit = 每个课程的单价 course.course_rate - 每张反馈表老师得到的钱 report.amout
//     var sum = 0
//     let reportContent = <div className="col m12">
//                         <div className="card white r-box-shadow">
//                           <div className="card-content">
//                             <h4 className="center">当前没有反馈表</h4>
//                           </div>
//                         </div>
//                       </div>
//     if(this.props.reports.length > 0) {
//       this.props.reports.forEach((report, idx) => {
//         const report_credit = getStudentReportCredit(report.situation)
//         if(report_credit > 0) {
//           sum += (report.course_id.course_rate * report_credit - report.amount)
//         }
//       })
//       reportContent = <PaginationContainer 
//                         itemsPerPage={20} 
//                         data={this.props.reports} 
//                         readOnly={false} 
//                       >
//                         <ProfitList />
//                       </PaginationContainer>
//     }

//     let compensationContent = <h4 className="center">当前没有补助或者罚款</h4>
//     if(this.props.compensations.length > 0) {
//       this.props.compensations.forEach((compensation, idx) => {
//         if(compensation.type === "罚款") sum += compensation.amount
//         else sum -= compensation.amount
//       })
//       compensationContent = <PaginationContainer 
//                               itemsPerPage={30} 
//                               data={this.props.compensations} 
//                               readOnly={false} 
//                             >
//                               <CompensationList />
//                             </PaginationContainer>
//     }

//     const clss = sum > 0 ? "green-text" : "red-text"

//     return(
//       <Row>
//         <Col m={12} s={12}>
//           <Card className='white r-box-shadow no-margin' textClassName='black-text' title=''>
//             <h5 className="airbnb-font bold">当前盈利: <span className={clss}>{sum.toFixed(2)}</span>元</h5>
//             <hr/>
//             <br/>
//             {reportContent}
//             <br/>
//             {compensationContent}
//           </Card>
//         </Col>
//       </Row>
//     )
//   }
// }

// const mapStateToProps = state => {
//   return {
//     auth: state.auth,
//     isLoading: state.status.loading,
//     reports: state.reportsData.reports,
//     compensations: state.compensationsData.compensations
//   };
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     setLoadingStatus: (isLoading) => {
//       dispatch(setLoadingStatus(isLoading))
//     },
//     getAllReports: () => {
//       dispatch(getAllReports())
//     },
//     getCompensations: () => {
//       dispatch(getCompensations())
//     }
//   };
// }
