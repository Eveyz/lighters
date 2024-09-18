import React from 'react';

import { Row, Col } from 'react-materialize';

class TeacherStudentList extends React.Component {
  render() {
    const students = this.props.students.map((student, index) => {
      return <tr key={index}>
              <td>{ student.englishname }</td>
              <td>{ student.lastname + student.firstname }</td>
              <td>{ student.age }</td>
              <td><button className="btn cyan">查看学生档案</button></td>
            </tr>
    });

    return(
      <Row>
        <Col m={12} s={12}>
          <div className="row">
            <div className="col m12">
              <h6 className="airbnb-font bold">学生</h6>
              <hr/>
              <table className="striped">
                <thead>
                  <tr>
                    <th>学生英文名</th>
                    <th>学生姓名</th>
                    <th>学生年龄</th>
                    <th colSpan="1"></th>
                  </tr>
                </thead>
        
                <tbody>
                  {students}
                </tbody>
              </table>
            </div>
          </div>
        </Col>
      </Row>
    )
  }
}

export default TeacherStudentList;