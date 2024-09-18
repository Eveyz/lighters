import React from 'react';
import axios from 'axios'
// import { deleteStudent } from '../actions/courses_actions';

const Tag = props => {
  const remove = () => {
    // this.props.remove(props.id, props.object._id);
    axios.put(`/courses/${props.id}/delete_student`, {"studentID": props.object._id})
      .then(response => {
        props.removedStudent()
        window.Materialize.toast('成功移除学生', 1000, 'green')
      })
      .catch(err => {
        console.log(err)
      });
  }

  return (
    <div className="chip">
      {props.content}
      <span onClick={remove} style={{cursor: "pointer", color: "#e74c3c"}}> &#10005;</span>
    </div>
  )
}

export default Tag

// class Tag extends React.Component {
//   constructor(props) {
//     super(props)

//     this.remove = this.remove.bind(this);
//   }

//   remove() {
//     this.props.remove(this.props.id, this.props.object._id);
//   }

//   render() {
//     return (
//       <div className="chip">
//         {this.props.content}
//         <span onClick={this.remove.bind(this)} style={{cursor: "pointer", color: "#e74c3c"}}> &#10005;</span>
//       </div>
//     )
//   }
// }

// const mapDispatchtoProps = dispatch => {
//   return {
//     remove: (id, studentID) => dispatch(deleteStudent(id, studentID))
//   }
// }

// export default connect(null, mapDispatchtoProps)(Tag);