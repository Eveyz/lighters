import React from "react";
import StudentList from "./StudentList";
import Tag from "./Tag";

class AddStudentsWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      student: '',
      allStudentList: [],
      mode: this.props.mode || "search",
    };
  }

  componentWillMount() {
    $.getJSON("get_students", (response) => { this.setState({ students: response }) });
  }

  switchMode() {
    if(this.state.mode === "search") {
      $.getJSON('/students', (response) => { this.setState({ mode: "browse", allStudentList: response }) });
    } else {
      this.setState({ mode: "search", allStudentList: [] });
    }
  }

  searchName(evt) {
    var val = evt.target.value
    if(val) {
      $.ajax({
        url: "/students/search_student",
        type: "get",
        dataType: 'json',
        data: { name: val },
        success: response => {
          this.setState({
            allStudentList: response
          })
        }
      });
    }
  }

  addStudent(id, name) {
    var url = "/courses/" + this.props.course_id + "/enroll_student";
    if(name) {
      $.ajax({
        url: url,
        type: "post",
        beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
        dataType: 'json',
        data: { name: name, student_id: id },
        success: response => {
          this.setState({students: response});
          M.toast({html: "添加学生成功"})
        }
      });
    }
  }

  deleteStudent(id) {
    var url = "/courses/" + this.props.course_id + "/drop_student";
    if(id) {
      $.ajax({
        url: url,
        type: "delete",
        beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
        dataType: 'json',
        data: { student_id: id },
        success: response => {
          console.log(response);
          this.setState({students: response});
          M.toast({html: "移除学生成功"})
        }
      });
    }
  }

  render() {

    var curStudentsList = this.state.students.map((student, index) => {
                            return (
                              <Tag key={student[0]} student={student} deleteStudent={this.deleteStudent.bind(this)} />
                            );
                          });

    var curStudents = this.state.students.length > 0 ? <div>当前学生: {curStudentsList}</div> : <p>当前学生: 0</p>;
    
    const mode = this.state.mode;
    let widget = mode == "search" ? 
      <div>
        <nav>
          <div className="nav-wrapper blue-grey">
            <form>
              <div className="input-field">
                <input 
                  id="search" 
                  type="search" 
                  required
                  onChange={this.searchName.bind(this)}
                />
                <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
                <i className="material-icons">close</i>
              </div>
            </form>
          </div>
        </nav>
      </div>
      : '';
    
    var studentList = this.state.allStudentList.length > 0 ? <StudentList students={this.state.allStudentList} addStudent={this.addStudent.bind(this)} /> : '';

    return (
      <div>
        <div className="row">
          <div className="col s12 m12">
            <h4>{ this.props.course_name }</h4>
            <p>授课老师: { this.props.teacher }</p>
            <p>课程级别: { this.props.course_level } </p>
            <p>课程容量: { this.props.course_capacity }</p>
            { curStudents }
          </div>
        </div>
        <div className="row">

          <div className="col s12 m12">
            <div className="card">
              <div className="card-content">

                <div className="switch">
                  <label>
                    搜索
                    <input type="checkbox" onChange={this.switchMode.bind(this)} />
                    <span className="lever"></span>
                    浏览
                  </label>
                </div>
                <br/>
                {widget}
                {studentList}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default AddStudentsWidget;
