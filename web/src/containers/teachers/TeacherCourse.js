import React from 'react';
import history from '../../history'

const TeacherCourse = props => {
  
  const clickCourse = e => {
    e.preventDefault()
    let path = `/teachers/${props.teacher._id}/courses/${props.course._id}`
    history.push({
      pathname: path,
      state: { teacher: props.teacher, course: props.course }
    })
  }

  const image = props.course.theme ? props.course.theme : "WorldStudies-title.jpg"

  return(
    <a href="" onClick={clickCourse}>
      <div className="col s12 m6">
        <div className="card r-box-shadow">
          <div className="card-image">
            <img src={`${process.env.REACT_APP_IMAGE_PATH}${image}`} alt="course_background" />
            <span className="card-title text-overflow" style={{fontWeight: "400"}}><b>{ props.course.name }</b></span>
          </div>
          <div className="card-content">
            <p className="black-text">课程级别: { props.course.level }</p>
            <p className="black-text">学生数量: { props.course.students.length }</p>
            <p className="black-text">绘本数量: { props.course.books.length }</p>
          </div>
        </div>
      </div>
    </a>
  )
}

export default TeacherCourse

// class TeacherCourse extends React.Component {
//   constructor(props) {
//     super(props)

//     this.clickCourse = this.clickCourse.bind(this)
//   }

//   clickCourse = (e) => {
//     e.preventDefault();
//     let path = "/teachers/" + this.props.user_id + "/course_manager";
//     this.props.selectCourse(this.props.course, path);
//   }

//   render() {
//     const image = this.props.course.theme ? this.props.course.theme : "WorldStudies-title.jpg"

//     return(
//       <a href="" onClick={this.clickCourse}>
//         <div className="col s12 m6">
//           <div className="card r-box-shadow">
//             <div className="card-image">
//               <img src={require(`../../images/classroom/${image}`)} alt="course_background" />
//               <span className="card-title text-overflow" style={{fontWeight: "400"}}><b>{ this.props.course.name }</b></span>
//             </div>
//             <div className="card-content">
//               <p className="black-text">课程级别: { this.props.course.level }</p>
//               <p className="black-text">学生数量: { this.props.course.students.length }</p>
//               <p className="black-text">绘本数量: { this.props.course.books.length }</p>
//             </div>
//           </div>
//         </div>
//       </a>
//     )
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     selectCourse: (course, path) => {
//       dispatch(selectCourse(course, path))
//     }
//   }
// }

// export default connect(null, mapDispatchToProps)(TeacherCourse);