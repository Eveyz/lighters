import React from 'react'
import Course from './Course'

const GourpCourseList = props => {
  return (
    <div>
      <h6 style={{color: "rgba(0,0,0,.8)", fontWeight: "700"}}>{props.level}</h6>
      <div className="row">
        {
          props.courses.map((c, idx) => {
            return <Course key={idx} id={c._id} course={c} />
          })
        }
      </div>
    </div>
  )
}

export default GourpCourseList