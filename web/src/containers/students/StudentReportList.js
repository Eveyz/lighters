import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Table } from 'react-materialize';

class StudentReportList extends React.Component {
  render() {
    let content = <h5 className="center">没有课后反馈表</h5>;
    if(this.props.data.length > 0) {
      let reportList = this.props.data.map((report, index) => {
        return (
          <tr key={index} id={index}>
            <td>第{ index + 1 }次</td>
            <td>{ report.course_date } - {report.start_time } - {report.end_time}</td>
            <td>{ report.teacher_id.englishname }</td>
            <td>{ report.course_id.name }</td>
            <td>
              <Link to={`/reports/${report._id}/view`} target="_blank">
                <button type="button" className="btn">查看课程回馈表</button>
              </Link>
            </td>
          </tr>
        );
      });
      content = <Row>
                  <Col m={12}>
                    <Table>
                      <thead>
                        <tr>
                          <th>课程回馈表</th>
                          <th>上课时间</th>
                          <th>老师</th>
                          <th>课程</th>
                          <th colSpan="1"></th>
                        </tr>
                      </thead>

                      <tbody>
                        {reportList}
                      </tbody>
                    </Table>
                  </Col>
                </Row>
    }

    return (
      <div>
        {content}
      </div>
    )
  }
}

export default StudentReportList;