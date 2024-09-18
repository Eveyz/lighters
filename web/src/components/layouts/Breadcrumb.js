import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../css/App.css';

class Breadcrumb extends Component {
  render() {
    let links = "";
    let action = this.props.action;
    if(action === "dashboard") {
      links = <div>
                <span style={{color: "#BDC8CB"}}>Dashboard</span>
              </div>
    } else if(action === "students") {
      links = <div>
                <span style={{color: "#BDC8CB"}}><Link to="/admin/dashboard">Dashboard</Link> > 学生管理</span>
                <h5 style={{marginTop: "10px"}}><b>学生管理</b></h5>
              </div>
    } else if(action === "courses") {
      links = <div>
                <span style={{color: "#BDC8CB"}}><Link to="/admin/dashboard">Dashboard</Link> > 课程管理</span>
                <h5 style={{marginTop: "10px"}}><b>课程管理</b></h5>
              </div>
    } else if(action === "teachers") {
      links = <div>
                <span style={{color: "#BDC8CB"}}><Link to="/admin/dashboard">Dashboard</Link> > 教师管理</span>
                <h5 style={{marginTop: "10px"}}><b>教师管理</b></h5>
              </div>
    } else if(action === "books") {
      links = <div>
                <span style={{color: "#BDC8CB"}}><Link to="/admin/dashboard">Dashboard</Link> > 绘本管理</span>
                <h5 style={{marginTop: "10px"}}><b>绘本管理</b></h5>
              </div>
    } else if(action === "addStudents") {
      links = <div>
                <span style={{color: "#BDC8CB"}}><Link to="/admin/dashboard">Dashboard</Link> > <Link to="/admin/courses/all">课程管理</Link> > 添加学生</span>
                <h5 style={{marginTop: "10px"}}><b>添加学生</b></h5>
              </div>
    } else if(action === "addBooks") {
      links = <div>
                <span style={{color: "#BDC8CB"}}><Link to="/admin/dashboard">Dashboard</Link> > <Link to="/admin/courses/all">课程管理</Link> > 添加绘本</span>
                <h5 style={{marginTop: "10px"}}><b>添加绘本</b></h5>
              </div>
    } else if(action === "addCourse") {
      links = <div>
                <span style={{color: "#BDC8CB"}}><Link to="/admin/dashboard">Dashboard</Link> > <Link to="/admin/courses/all">课程管理</Link> > 添加课程</span>
                <h5 style={{marginTop: "10px"}}><b>添加课程</b></h5>
              </div>
    } else if(action === "updateCourse") {
      links = <div>
                <span style={{color: "#BDC8CB"}}><Link to="/admin/dashboard">Dashboard</Link> > <Link to="/admin/courses/all">课程管理</Link> > 编辑课程</span>
                <h5 style={{marginTop: "10px"}}><b>编辑课程</b></h5>
              </div>
    } else if(action === "showTeacher") {
      links = <div>
                <span style={{color: "#BDC8CB"}}><Link to="/admin/dashboard">Dashboard</Link> > <Link to="/admin/teachers/all">教师管理</Link></span>
                <h5 style={{marginTop: "10px"}}><b>查看教师</b></h5>
              </div>
    } else if(action === "showStudent") {
      links = <div>
                <span style={{color: "#BDC8CB"}}><Link to="/admin/dashboard">Dashboard</Link> > <Link to="/admin/students/all">学生管理</Link></span>
                <h5 style={{marginTop: "10px"}}><b>查看学生</b></h5>
              </div>
    } else if(action === "notifications") {
      links = <div>
                <span style={{color: "#BDC8CB"}}><Link to="/admin/dashboard">Dashboard</Link> > <Link to="/admin/notifications">系统通知</Link></span>
                <h5 style={{marginTop: "10px"}}><b>系统通知</b></h5>
              </div>
    }

    return (
      <div style={{backgroundColor: "white", padding: "20px 0px 20px 0px"}} className="r-box-shadow">
        <div className="container">
          <div className="row no-margin-bottom">
            <div className="col m12">
              {links}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Breadcrumb;