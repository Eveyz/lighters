import React from "react";
import Student from "./Student";

class StudentList extends React.Component {

  addStudent(id, name) {
    this.props.addStudent(id, name);
  }

  renderList() {
    return this.props.students.map((student, index) => {
      return (
        <Student key={index} student={student} addStudent={this.addStudent.bind(this)} />
      );
    });
  }

  render() {
    return (
      <div className="collection">
        {this.renderList()}
      </div>
    )
  }
}

export default StudentList;