import React from 'react'
import M from 'materialize-css'

import { getReportCredit } from '../../ultis'

class TeacherPaycheckList extends React.Component {
  componentDidMount() {
    var elems = document.querySelectorAll('.collapsible');
    M.Collapsible.init(elems, {});
  }

  render() {
    let paycheckList = this.props.paychecks.map((pc, idx) => {
      var extraBonus = 0
      return  <li key={idx}>
                <div className="collapsible-header">
                  <div style={{width: "33.3%"}}>{pc.month}</div>
                  <div style={{width: "33.3%"}}>{pc.reports.length}</div>
                  <div style={{width: "33.3%"}}>
                    {(pc.amount + extraBonus).toFixed(2)}
                  </div>
                </div>
                <div className="collapsible-body">
                  <h6 className="blue-text">课时费</h6>
                  <table>
                    <thead>
                      <tr>
                        <th>课程名称</th>
                        <th>上课时间</th>
                        <th>上课情况</th>
                        <th>课时费(元/课时)</th>
                        <th>实际支付(元)</th>
                      </tr>
                    </thead>

                    <tbody>
                      {
                        pc.reports.map((report, idx) => {
                          return <tr key={idx}>
                                  <td>{report.course_id.name}</td>
                                  <td>{report.course_date}</td>
                                  <td>{report.situation}</td>
                                  <td>{report.teacher_rate.toFixed(2)}</td>
                                  <td className="green-text">{(getReportCredit(report.situation) * report.teacher_rate).toFixed(2)}</td>
                                </tr>
                        })
                      }
                    </tbody>
                  </table>
                  {
                    pc.compensations.length > 0 ?
                    <React.Fragment>
                      <br/>
                      <h6 className="blue-text">奖励, 津贴或罚款</h6>
                      <table>
                        <thead>
                          <tr>
                            <th>类型</th>
                            <th>数额(元)</th>
                            <th>备注</th>
                          </tr>
                        </thead>
    
                        <tbody>
                          {
                            pc.compensations.map((c, idx) => {
                              return  <tr key={idx}>
                                        <td>{c.type}</td>
                                        {
                                          c.amount > 0 ? <td className="green-text">{`+${c.amount}`}</td> : <td className="red-text">{`-${c.amount}`}</td>
                                        }
                                        <td>{c.memo}</td>
                                      </tr>
                            })
                          }
                        </tbody>
                      </table>
                    </React.Fragment>
                    :
                    ""
                  }
                </div>
              </li>
    })
    let paychecks = <ul className="collapsible" data-collapsible="accordion">
                      {paycheckList}
                    </ul>

    return(
      <div>
        <div className="collapsible-header" style={{borderBottom: "none", paddingBottom: "0px"}}>
          <div style={{width: "33.3%"}}>月份</div>
          <div style={{width: "33.3%"}}>反馈表数量</div>
          <div style={{width: "33.3%"}}>工资(元)</div>
        </div>
        {paychecks}
      </div>
    )
  }
}

export default TeacherPaycheckList