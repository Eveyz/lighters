import React from 'react';
import { Row, Col } from 'react-materialize';
import _ from 'lodash';

import PaginationContainer from '../PaginationContainer';
import BookList from '../books/BookList';
import Empty from '../../images/empty.png';
import StudentReportList from './StudentReportList';
// import { COURSE_TOP_BAR_COLOR } from '../../ultis'
// import CD1 from '../../images/course_decoration1.svg'
// import CD2 from '../../images/course_dec2.svg'
// import CD3 from '../../images/course_dec3.svg'

class StudentCourseList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      render: "course",
      course: ""
    };

    this.checkReports = this.checkReports.bind(this);
    this.checkBooks = this.checkBooks.bind(this);
    this.back = this.back.bind(this);
  }

  checkReports = (e, id) => {
    e.preventDefault();
    this.setState({render: "report", course: id});
  }

  checkBooks = (e, id) => {
    e.preventDefault();
    this.setState({render: "book", course: id});
  }

  back = (e) => {
    e.preventDefault();
    this.setState({render: "course", course: ""});
  }

  render() {
    let content = <div className="card white r-box-shadow">
                    <div className="card-content">
                      <h5 className="center">当前没有课程</h5>
                    </div>
                  </div>;
    
    if(this.props.courses.length > 0) {
      if(this.state.render === "course") {
        content = this.props.courses.map((course, idx) => {
          let nameList = course.teachers.map((teacher, index) => {
            return (
              <span key={index}>{teacher.lastname + teacher.firstname}</span>
            )
          });
          const image = course.theme ? course.theme : "WorldStudies-title.jpg"
          return  <div key={idx} className="col s12 m6">
                    <div className="card r-box-shadow">
                      <div className="card-image">
                        <img src={`${process.env.REACT_APP_IMAGE_PATH}${image}`} alt="course_background" />
                        <span className="card-title text-overflow" style={{fontWeight: "400"}}><b>{ course.name }</b></span>
                      </div>
                      <div className="card-content">
                        <p>授课老师: {nameList}</p>
                        <p>课程级别: { course.level }</p>
                        <p>绘本数量: { course.books.length }</p>
                      </div>
                      <div className="card-action">
                        <a href="" onClick={(e) => this.checkReports(e, course._id)}>查看所有课后反馈表</a>
                        <a href="" onClick={(e) => this.checkBooks(e, course._id)}>查看课程绘本</a>
                      </div>
                    </div>
                  </div>
        });
      } else if (this.state.render === "book") {
        let current_course = this.state.course;
        let _course = this.props.courses.find((c) => {
          return c._id === current_course;
        });
        content = _course.books.length > 0 ? <Col m={12} s={12}>
                                                <div className="card r-box-shadow">
                                                  <div className="card-content">
                                                    <button className="btn white black-text" onClick={(e) => this.back(e)}>返回</button>
                                                    <PaginationContainer 
                                                      itemsPerPage={10} 
                                                      data={_course.books} 
                                                      readOnly={false} 
                                                    >
                                                      <BookList />
                                                    </PaginationContainer>
                                                  </div>
                                                </div>
                                              </Col>
                                              :
                                              <Col m={12} s={12}>
                                                <div className="card r-box-shadow">
                                                  <div className="card-content">
                                                    <button className="btn white black-text" onClick={(e) => this.back(e)}>返回</button>
                                                    <div className="center">
                                                      <h4>目前没有绘本资料</h4>
                                                      <img src={Empty} width="350" alt="empty state" />
                                                    </div>
                                                  </div>
                                                </div>
                                              </Col>
      } else if (this.state.render === "report") {
        let current_course = this.state.course;
        let _reports = [];
        this.props.reports.forEach((report) => {
          if(report.course_id._id === current_course)
            _reports.push(report);
        });
        _reports = _.sortBy(_reports, 'course_date')
        content = _reports.length > 0 ? <Col m={12} s={12}>
                                          <div className="card r-box-shadow">
                                            <div className="card-content">
                                              <button className="btn white black-text" onClick={(e) => this.back(e)}>返回</button>
                                              <PaginationContainer itemsPerPage={10} data={_reports} content={"REPORT"} readOnly={true}>
                                                <StudentReportList />
                                              </PaginationContainer>
                                            </div>
                                          </div>
                                        </Col>
                                        :
                                        <Col m={12} s={12}>
                                          <div className="card r-box-shadow">
                                            <div className="card-content">
                                              <button className="btn white black-text" onClick={(e) => this.back(e)}>返回</button>
                                              <div className="center">
                                                <h4>此课程目前还没有反馈表</h4>
                                                <img src={Empty} width="350" alt="empty state" />
                                              </div>
                                            </div>
                                          </div>
                                        </Col>
      }
    }

    // let title = <h6>当前所有课程</h6>;
    // if(this.state.render === "book") {
    //   title = <h6>绘本资料</h6>;
    // } else if(this.state.render === "report") {
    //   title = <h6>课程反馈表</h6>;
    // }

    return(
      <div>
        <Row>
          {content}
        </Row>
      </div>
    )
  }
}

export default StudentCourseList;