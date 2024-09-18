import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'

import '../../../css/App.css';
import Loading from '../../../components/Loading';
// import { logout, adminInit } from "../../../actions/users_actions.js";
import Header from '../../../components/layouts/Header';
import Breadcrumb from '../../../components/layouts/Breadcrumb';
import Footer from '../../../components/layouts/Footer';

const Dashboard = props => {

  const [isLoading, setIsLoading] = useState(true)
  const [counts, setCounts] = useState({})

  useEffect(() => {
    axios.get("/users/admin/init")
    .then(res => {
      setCounts(res.data)
      setIsLoading(false)
    })
    .catch(err => {
      console.log(err)
    })
  }, [])

  var content = isLoading ? 
                  <Loading />
                  :
                  <div className="container">
                    <br/>
                    <div className="row">
                      <div className="col m12">
                        <h6 style={{color: "#171718", fontWeight: "700"}}>系统管理</h6>
                      </div>
                    </div>
                    
                    <div className="row">
                      <Link to="/admin/courses/all">
                        <div className="col s12 m6">
                          <div className="card r-box-shadow link" style={{borderTop: "6px solid #69639a"}}>
                            <div className="card-content" style={{padding: "30px"}}>
                              <span className="card-title black-text r-font-color" style={{fontWeight: "400"}}><b>课程管理</b></span>
                              <p>{counts.courses} 个课程</p>
                            </div>
                          </div>
                        </div>
                      </Link>

                      <Link to="/admin/teachers/all">
                        <div className="col s12 m6">
                          <div className="card r-box-shadow link" style={{borderTop: "6px solid #4c7ef3"}}>
                            <div className="card-content" style={{padding: "30px"}}>
                              <span className="card-title black-text r-font-color airbnb-font" style={{fontWeight: "400"}}><b>教师管理</b></span>
                              <p>{counts.teachers} 个教师</p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>

                    <div className="row">
                      <Link to="/admin/students/all">
                        <div className="col s12 m6">
                          <div className="card r-box-shadow link" style={{borderTop: "6px solid #6df0c2"}}>
                            <div className="card-content" style={{padding: "30px"}}>
                              <span className="card-title black-text r-font-color" style={{fontWeight: "400"}}><b>学生管理</b></span>
                              <p>{counts.students} 个学生</p>
                            </div>
                          </div>
                        </div>
                      </Link>

                      <Link to="/admin/dashboard">
                        <div className="col s12 m6">
                          <div className="card r-box-shadow link" style={{borderTop: "6px solid #ffc107"}}>
                            <div className="card-content" style={{padding: "30px"}}>
                              <span className="card-title black-text r-font-color" style={{fontWeight: "400"}}><b>绘本管理</b></span>
                              <p>{counts.books} 本绘本</p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>

                    <div className="row">
                      <Link to="/assets/level_salaries">
                        <div className="col s12 m6">
                          <div className="card r-box-shadow link" style={{borderTop: "6px solid #FF5A5F"}}>
                            <div className="card-content" style={{padding: "30px"}}>
                              <span className="card-title black-text r-font-color" style={{fontWeight: "400"}}><b>资金管理</b></span>
                              <p>{counts.paychecks} 个教师未付账目</p>
                            </div>
                          </div>
                        </div>
                      </Link>
                      <Link to="/admin/notifications">
                        <div className="col s12 m6">
                          <div className="card r-box-shadow link" style={{borderTop: "6px solid #9b59b6"}}>
                            <div className="card-content" style={{padding: "30px"}}>
                              <span className="card-title black-text r-font-color" style={{fontWeight: "400"}}><b>通知</b></span>
                              <p>{counts.notifications} 个未查看通知</p>
                            </div>
                          </div>
                        </div>
                      </Link>

                    </div>

                    <br/>
                    <br/>
                  </div>;

  return (
    <div>
      <Header />
      <div className="bg-light-grey page-min-height">
        <Breadcrumb action="dashboard" />
        {content}
      </div>
      <Footer/>
    </div>
  )
}

export default Dashboard