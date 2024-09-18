import React, { useEffect, useState } from 'react'
import axios from 'axios'
import M from 'materialize-css'
import { Link } from 'react-router-dom'

import Loading from '../../components/Loading'
import Header from '../../components/layouts/Header'
import Footer from '../../components/layouts/Footer'
import Breadcrumb from '../../components/layouts/Breadcrumb'
import { CLASS_LEVEL } from '../../ultis'
import GourpCourseList from './GourpCourseList'

const TableCourseList = props => {

  const [isLoading, setIsLoading] = useState(true)
  const [courses, setCourses] = useState({})

  useEffect(() => {
    axios.get("/courses?field=level")
    .then(res => {
      setCourses(res.data)
      setIsLoading(false)
      M.AutoInit()
    })
    .catch((e) => {
      console.log(e)
    })
  }, [])

  var activeCoursesCount = 0, inactiveCoursesCount = 0;
  var activeCoursesList = [], inactiveCoursesList = [];

  if(courses["active"]) {
    CLASS_LEVEL.forEach(level => {
      if(level in courses["active"]) {
        activeCoursesCount += courses["active"][level].length
        activeCoursesList.push(<GourpCourseList key={activeCoursesCount} level={level} courses={courses["active"][level]} />)
      }

      if(level in courses["inactive"]) {
        inactiveCoursesCount += courses["inactive"][level].length
        inactiveCoursesList.push(<GourpCourseList key={inactiveCoursesCount} level={level} courses={courses["inactive"][level]} />)
      }
    })
  }
  
  if(activeCoursesList.length <= 0) {
    activeCoursesList = <div className="col m12">
                          <div className="card white r-box-shadow">
                            <div className="card-content">
                              <h4 className="center">当前没有课程，请添加</h4>
                            </div>
                          </div>
                        </div>
  }

  if(inactiveCoursesList.length <= 0) {
    inactiveCoursesList =  <div className="col m12">
                              <div className="card white r-box-shadow">
                                <div className="card-content">
                                  <h4 className="center">当前没有过期课程</h4>
                                </div>
                              </div>
                            </div>
  }

  if(isLoading) {
    return (
      <div>
        <Header />
        <div className="bg-light-grey page-min-height">
          <Loading />
        </div>
      </div>
    )
  }

  return (
    <div>
      <Header />
      <div className="bg-light-grey page-min-height">
        <Breadcrumb action="courses"/>

        <div className="container">
          <br/>
          <div className="row">
            <div className="col m12">
              <Link to="/courses/add_course" className="btn"><i className="material-icons left">add</i>添加课程</Link>
            </div>
          </div>
          <div className="row">
            <div className="col m3">
              <h6 style={{color: "rgba(0,0,0,.8)", fontWeight: "700"}}>所有课程</h6>
            </div>
          </div>

          <div className="row">
            <div className="col s12">
              <ul className="tabs">
                <li className="tab col s6 m6"><a className="active" href="#test1">活跃课程({activeCoursesCount})</a></li>
                <li className="tab col s6 m6"><a href="#test2">过期课程({inactiveCoursesCount})</a></li>
              </ul>
            </div>
            <div id="test1" className="col s12">{activeCoursesList}</div>
            <div id="test2" className="col s12">{inactiveCoursesList}</div>
          </div>

        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default TableCourseList