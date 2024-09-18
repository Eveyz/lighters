import React from 'react';
import { Row, Col, Card } from 'react-materialize';
import M from 'materialize-css'

class TuitionInputForm extends React.Component {
  constructor(props) {
    super(props)

    this.student_id = React.createRef();
    // this.course_id = React.createRef();
    // this.course_hour = React.createRef();
    this.amount = React.createRef();
    // this.time = React.createRef();

    this.handleCancel = this.handleCancel.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    M.updateTextFields();
    M.AutoInit();
  }

  handleCancel() {
    this.props.cancel();
  }

  handleSubmit() {
    let _student_id = this.student_id.current.value
    // let _course_id = this.course_id.current.value
    // let _course_hour = this.course_hour.current.value
    let _amount = this.amount.current.value
    // let _time = this.time.current.value
    if(!_student_id || !_amount) {
      window.Materialize.toast('请确认填写所有的项目', 1000);
    } else {
      let _tuition = this.props.action === "NEW" ? 
      {
        student_id: _student_id,
        // course_id: _course_id,
        // course_hour: _course_hour,
        amount: _amount,
        // time: _time,
        // remain: _course_hour
      } 
      :
      {
        _id: this.props.tuition._id,
        student_id: _student_id,
        // course_id: _course_id,
        // course_hour: _course_hour,
        amount: _amount,
        // time: _time,
      }
      this.props.onSubmit(_tuition);
    }
  }

  render() {

    let studentsList = this.props.students.map((student, idx) => {
      return <option key={idx} value={student._id}>
                {
                  student.lastname ? 
                  `${student.lastname + student.firstname}(${student.englishname})`
                  :
                  student.englishname
                }
              </option>
    })

    // let coursesList = this.props.courses.map((course, idx) => {
    //   return <option key={idx} value={course.id}>{course.name}</option>;
    // });

    return(
      <div>
        <Row>
          <Col m={12} s={12}>
            <Card className='white no-margin' textClassName='black-text' title=''>
              <div className="row">
                <div className="input-field col s12 m6">
                  <select
                    ref={this.student_id}
                    id="student_id"
                    defaultValue={this.props.action === "EDIT" ? this.props.tuition.student_id._id : "default"}
                  >
                    <option key="default" value="default" disabled>请选择学生</option>
                    {studentsList}
                  </select>
                  <label htmlFor="student_id">选择学生 <span className="required">*</span></label>
                </div>
                <div className="input-field col s12 m6">
                  <input 
                    defaultValue={this.props.action === "EDIT" ? this.props.tuition.amount : ""} 
                    ref={this.amount} 
                    id="amount" 
                    type="number" 
                    className="validate" 
                  />
                  <label htmlFor="amount">总数目(元) <span className="required">*</span></label>
                </div>
                {/* <div className="input-field col s12 m12">
                  <input 
                    defaultValue={this.props.action === "EDIT" ? this.props.tuition.time : ""}
                    type="date" 
                    className="validate"
                    ref={this.time}
                    id="time"
                  ></input>
                </div> */}
              </div>
              <button className="btn" onClick={this.handleSubmit}>保存</button>
              <button className="btn white black-text right" onClick={this.handleCancel}>取消</button>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default TuitionInputForm;