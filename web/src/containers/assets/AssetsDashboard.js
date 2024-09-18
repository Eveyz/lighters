import React from 'react'
import { Link } from 'react-router-dom'

import Header from '../../components/layouts/Header'
import LevelandSalary from './LevelSalary'
import TeacherSalary from './TeacherSalary'
import Transactions from './transactions/Transactions'
import Tuitions from './tuitions/tuitions'
import TeacherRates from './rates/TeacherRates'
import Profit from './profit/Profit'

const AssetsDashboard = (props) => {

  let content = ""
  let active = ""
  let path = ""
  let name = ""
  if(props.location.pathname.includes("level_salaries")) {
    content = <LevelandSalary />
    active = "level_salaries"
    path = "/assets/level_salaries"
    name = "标准等级工资设定"
  } else if (props.location.pathname.includes("teacher_rates")) {
    content = <TeacherRates />
    active = "teacher_rates"
    path = "/assets/teacher_rates"
    name = "个别教师工资设定"
  } else if (props.location.pathname.includes("teacher_salaries")) {
    content = <TeacherSalary />
    active = "teacher_salaries"
    path = "/assets/teacher_salaries"
    name = "教师工资管理"
  } else if (props.location.pathname.includes("tuitions")) {
    content = <Tuitions />
    active = "tuitions"
    path = "/assets/tuitions"
    name = "学员学费管理"
  } else if (props.location.pathname.includes("transactions")) {
    content = <Transactions />
    active = "transactions"
    path = "/assets/transactions"
    name = "公司资金明细"
  } else if (props.location.pathname.includes("profit")) {
    content = <Profit />
    active = "profit"
    path = "/assets/profit"
    name = "当前课程盈利"
  }

  const num = props.lowBalanceStudentsNum > 0 ? <span className="new badge red" data-badge-caption="个">{props.lowBalanceStudentsNum}</span> : "";

  return (
    <div>
      <Header />
      <div className="custom-container">
        <br/>
        <div className="row no-margin">
          <Link to={`/admin/dashboard`} className="airbnb-font bold"><u>管理员面板</u></Link> > <Link to={path} className="airbnb-font bold grey-text">{name}</Link>
        </div>
        <br/>
        <div className="left-fixed-bar space-one">
          <ul className="no-margin">
            <li><Link to="/assets/level_salaries" className={`${active === "level_salaries" ? "active" : ""} airbnb-font bold`}>标准等级工资设定</Link></li>
            <li><Link to="/assets/teacher_rates" className={`${active === "teacher_rates" ? "active" : ""} airbnb-font bold`}>个别教师工资设定</Link></li>
            <li><Link to="/assets/teacher_salaries" className={`${active === "teacher_salaries" ? "active" : ""} airbnb-font bold`}>教师工资管理</Link></li>
            <li><Link to="/assets/tuitions" className={`${active === "tuitions" ? "active" : ""} airbnb-font bold`}>学员学费管理{num}</Link></li>
            <li><Link to="/assets/transactions" className={`${active === "transactions" ? "active" : ""} airbnb-font bold`}>公司资金明细</Link></li>
            <li><Link to="/assets/profit" className={`${active === "profit" ? "active" : ""} airbnb-font bold`}>当前课程盈利</Link></li>
          </ul>
        </div>
        <div className="main-content-wrapper space-one">
          <div className="main-content">
            {content}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AssetsDashboard

// class AssetsDashboard extends React.Component {
//   componentWillMount() {
//     this.props.setLoadingStatus(true);
//     this.props.getEntries();
//   }

//   render() {
//     if(this.props.isLoading) {
//       return <Loading />
//     }

//     let content = ""
//     let active = ""
//     let path = ""
//     let name = ""
//     if(this.props.location.pathname.includes("level_salaries")) {
//       content = <LevelandSalary />
//       active = "level_salaries"
//       path = "/assets/level_salaries"
//       name = "标准等级工资设定"
//     } else if (this.props.location.pathname.includes("teacher_rates")) {
//       content = <TeacherRates />
//       active = "teacher_rates"
//       path = "/assets/teacher_rates"
//       name = "个别教师工资设定"
//     } else if (this.props.location.pathname.includes("teacher_salaries")) {
//       content = <TeacherSalary />
//       active = "teacher_salaries"
//       path = "/assets/teacher_salaries"
//       name = "教师工资管理"
//     } else if (this.props.location.pathname.includes("tuitions")) {
//       content = <Tuitions />
//       active = "tuitions"
//       path = "/assets/tuitions"
//       name = "学员学费管理"
//     } else if (this.props.location.pathname.includes("transactions")) {
//       content = <Transactions />
//       active = "transactions"
//       path = "/assets/transactions"
//       name = "公司资金明细"
//     } else if (this.props.location.pathname.includes("profit")) {
//       content = <Profit />
//       active = "profit"
//       path = "/assets/profit"
//       name = "当前课程盈利"
//     }

//     const num = this.props.lowBalanceStudentsNum > 0 ? <span className="new badge red" data-badge-caption="个">{this.props.lowBalanceStudentsNum}</span> : "";

//     return (
//       <div>
//         <Header />
//         <div className="custom-container">
//           <br/>
//           <div className="row no-margin">
//             <Link to={`/admin/dashboard`} className="airbnb-font bold"><u>管理员面板</u></Link> > <Link to={path} className="airbnb-font bold grey-text">{name}</Link>
//           </div>
//           <br/>
//           <div className="left-fixed-bar space-one">
//             <ul className="no-margin">
//               <li><Link to="/assets/level_salaries" className={`${active === "level_salaries" ? "active" : ""} airbnb-font bold`}>标准等级工资设定</Link></li>
//               <li><Link to="/assets/teacher_rates" className={`${active === "teacher_rates" ? "active" : ""} airbnb-font bold`}>个别教师工资设定</Link></li>
//               <li><Link to="/assets/teacher_salaries" className={`${active === "teacher_salaries" ? "active" : ""} airbnb-font bold`}>教师工资管理</Link></li>
//               <li><Link to="/assets/tuitions" className={`${active === "tuitions" ? "active" : ""} airbnb-font bold`}>学员学费管理{num}</Link></li>
//               <li><Link to="/assets/transactions" className={`${active === "transactions" ? "active" : ""} airbnb-font bold`}>公司资金明细</Link></li>
//               <li><Link to="/assets/profit" className={`${active === "profit" ? "active" : ""} airbnb-font bold`}>当前课程盈利</Link></li>
//             </ul>
//           </div>
//           <div className="main-content-wrapper space-one">
//             <div className="main-content">
//               {content}
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   }
// }

// const mapStateToProps = state => {
//   return {
//     isLoading: state.status.loading,
//     lowBalanceStudentsNum: state.studentsData.lowBalanceStudents.length
//   };
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     setLoadingStatus: (status) => {
//       dispatch(setLoadingStatus(status))
//     },
//     getEntries: () => {
//       dispatch(getLevelSalaries())
//     }
//   };
// }
