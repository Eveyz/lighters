import React from "react";

class Student extends React.Component {
  addStudent() {
    this.props.addStudent(this.props.student[0], this.props.student[1] + this.props.student[2]);
  }

  render() {
    return (
      <a href="javascript:;" onClick={this.addStudent.bind(this)} className="collection-item">{this.props.student[2] + this.props.student[1]}</a>
    )
  }
}

export default Student;