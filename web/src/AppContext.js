import React, { useState, useEffect } from 'react'
import jwtDecode from 'jwt-decode'

const AppContext = React.createContext([{}, () => {}])

const AppContextProvider = (props) => {
  const [state, setState] = useState({})

  useEffect(() => {
    var token, current_student, current_teacher
    token = localStorage.getItem('jwtToken') || null
    try {
      current_teacher = JSON.parse(localStorage.getItem('current_teacher'))
    } catch (e) {
      current_teacher = {}
    }
    try {
      current_student = JSON.parse(localStorage.getItem('current_student'))
    } catch(e) {
      current_student = {}
    }
    if(token) {
      var user = jwtDecode(token)
      let t = parseInt(new Date().getTime()/1000, 10)
      if(t - user.exp >= 0) {
        setState({ 
          auth: false,
          current_user: null,
          current_course: null,
          current_teacher: null,
          current_student: null,
          current_report: null
        })
      } else {
        setState({
          auth: true,
          current_user: user,
          current_course: null,
          current_teacher: current_teacher,
          current_student: current_student,
          current_report: null,
        })
      }
    } else {
      setState({
        auth: false,
        current_user: null,
        current_course: null,
        current_teacher: null,
        current_student: null,
        current_report: null
      })
    }
  }, [])

  return  <AppContext.Provider value={[state, setState]}>
            {props.children}
          </AppContext.Provider>
}

export { AppContext, AppContextProvider }