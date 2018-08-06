import React from "react";

class Tag extends React.Component {
  
  deleteStudent() {
    var student_id = this.props.student[0];
    this.props.deleteStudent(student_id);
  }

  render() {
    return (
      <div className="chip">
        {this.props.student[2] + this.props.student[1]}
        <i className="close material-icons" onClick={this.deleteStudent.bind(this)}>close</i>
      </div>
    )
  }
}

export default Tag;