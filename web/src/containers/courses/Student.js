import React from 'react';

import axios from 'axios'

const Student = props => {

  const addStudent = (e) => {
    e.preventDefault();
    axios.post(`/courses/${props.course._id}/post_student`, {"studentID": props.student._id})
    .then(res => {
      props.addedStudent()
      window.Materialize.toast('成功添加学生', 1000, 'green')
    })
    .catch(err => {
      console.log(err)
    })
  }

  let name = props.student.lastname ? `(${props.student.lastname}${props.student.firstname})` : "";
  return(
    <a href="" onClick={addStudent} className="collection-item">{props.student.englishname} {name}</a>
  )
}

export default Student

// class StudentItem extends React.Component {
//   constructor(props) {
//     super(props)

//     this.addStudent = this.addStudent.bind(this);
//   }

//   addStudent(e) {
//     e.preventDefault();
//     let studentID = this.props.student._id;
//     let courseID = this.props.course._id;
//     this.props.addStudent(courseID, {"studentID": studentID});
//   }

//   render() {
//     let name = this.props.student.lastname ? `(${this.props.student.lastname}${this.props.student.firstname})` : "";
//     return(
//       <a href="" onClick={this.addStudent} className="collection-item">{this.props.student.englishname} {name}</a>
//     )
//   }
// };

// const mapStatetoProps = (state) => {
//   return {
//     course: state.coursesData.currentCourse
//   }
// }

// const mapDispatchtoProps = (dispatch) => {
//   return {
//     addStudent: (courseID, studentID) => dispatch(postStudent(courseID, studentID))
//   }
// };

// export default connect(mapStatetoProps, mapDispatchtoProps)(StudentItem);