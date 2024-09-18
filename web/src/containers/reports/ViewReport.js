import React from 'react'
import axios from 'axios'
import html2canvas from 'html2canvas'

import Header from '../../components/layouts/Header'
import Footer from '../../components/layouts/Footer'
import Loading from '../../components/Loading'

// import Logo from '../../images/logo12.svg';

class ViewReport extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      report: {},
      isLoading: true,
      img: false
    }

    this.downloadReport = this.downloadReport.bind(this)
  }
  
  componentDidMount() {
    axios.get(`/reports/${this.props.match.params._id}`).then((response) => {
      this.setState({
        report: response.data,
        isLoading: false
      })
    }).catch((err) => {
      console.log("Cannot get report")
    })
  }

  downloadReport() {
    const report_name = `${this.state.report.student_id.englishname}课程反馈表-${this.state.report.course_date}.png`;
    html2canvas(document.querySelector("#report_content")).then(canvas => {
      document.querySelector("#report_img").appendChild(canvas)
      var a = document.createElement('a');
      a.href = canvas.toDataURL()
      a.download = report_name
      a.click();
      this.setState({
        img: true
      })
    });
  }

  render() {
    const { report, isLoading } = this.state;
    
    if(isLoading) {
      return <Loading />
    }

    const tableRows = report.course_content.map((row, idx) => {
      if(row) {
        return  <tr key={idx} align="center">
                  <td className="col m1 report-cell-padding">{row.category}</td>
                  <td className="col m3 report-cell-padding">{row.serialName}</td>
                  <td className="col m1 report-cell-padding">{row.type}</td>
                  <td className="col m1 report-cell-padding">{row.ratio}</td>
                  <td className="col m6 report-cell-padding">{row.keywords}</td>
                </tr>
      } else {
        return null
      }
    })

    const btn = this.state.img ? <div>已生成报告图片, 如果没有开始自动下载, 请右键点击报告保存图片</div> : <button className="btn" onClick={this.downloadReport}><i className="material-icons left">cloud_download</i>下载报告</button>

    const _report = this.state.img ? "" :
    <div id="report_content">
      <div className="card r-box-shadow report-border">
        <div className="card-content" style={{padding: "5px"}}>
          <div className="row no-margin">
            <div className="input-field col m12 s12">
              <h4 className="center orange-text no-margin">Lighters 绘说英语 - 上课反馈</h4>
              <br/>
              <p><span className="orange-text">上课学员:</span> {report.student_id.englishname}</p>
              <p><span className="orange-text">上课老师:</span> {report.teacher_id.englishname}老师</p>
              <p><span className="orange-text">课程名称:</span> {report.course_id.name}</p>
              <p><span className="orange-text">课程时间:</span> {report.course_date} {report.start_time}-{report.end_time}</p>
              <p><span className="orange-text">上课情况:</span> {report.situation}</p>
              <p><span className="orange-text">专注时长:</span> {report.focus}</p>
              <br />
              <h5 className="orange-text">上课内容</h5>
              <table>
                <thead>
                  <tr>
                    <th className="col m1 report-cell-padding">读物类型</th>
                    <th className="col m3 report-cell-padding">读物系列名/书名/章节</th>
                    <th className="col m1 report-cell-padding">类别</th>
                    <th className="col m1 report-cell-padding">翻译比例</th>
                    <th className="col m6 report-cell-padding">Key Words/Patterns</th>
                  </tr>
                </thead>

                <tbody>
                  {tableRows}
                </tbody>
              </table>
              <h5 className="orange-text">上课反馈</h5>
              <div dangerouslySetInnerHTML={{__html: report.tutor_comment}} />
              <h5 className="orange-text">课后任务</h5>
              <div dangerouslySetInnerHTML={{__html: report.homework}} />
              <br/>
              <h5 className="center orange-text">希望你可以每天听音频, 跟读原文录音!</h5>
              <h5 className="center orange-text">相信如此坚持下来, 肯定会见到美丽的彩虹!</h5>
            </div>
          </div>
        </div>
      </div>
    </div>

    return (
      <div className="page-min-height">
        <Header />
          <div className="row no-margin">
            <div className="input-field col m6 s12 offset-m3">
              <br/>
              {btn}
              <br/>
              <div id="report_img"></div>
              {_report}
            </div>
          </div>
        <Footer />
      </div>
    )
  }
}

export default ViewReport;