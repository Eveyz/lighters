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
        <span onClick={this.deleteStudent.bind(this)} style={{cursor: "pointer", color: "#e74c3c;"}}> &#10005;</span>
      </div>
    )
  }
}

export default Tag;