import React from 'react';
import { Row, Col, Card } from 'react-materialize';
import M from 'materialize-css';
import { CLASS_TYPE, CLASS_LEVEL } from '../../../ultis';

class TeacherRateInputForm extends React.Component {
  constructor(props) {
    super(props)

    this.teacher_id = React.createRef();
    this.course_type = React.createRef();
    this.course_level = React.createRef();
    this.rate = React.createRef();

    this.handleCancel = this.handleCancel.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    M.updateTextFields();
    // M.AutoInit();
    var elems = document.querySelectorAll('select');
    M.FormSelect.init(elems, {});
  }

  handleCancel() {
    this.props.cancel();
  }

  handleSubmit() {
    let _teacher_id = this.teacher_id.current.value
    let _course_type = this.course_type.current.value
    let _course_level = this.course_level.current.value
    let _rate = this.rate.current.value
    if(!_teacher_id || !_course_type || !_course_level || !_rate) {
      window.Materialize.toast('请确认填写所有的项目', 1000);
    } else {
      let _teacher_rate = this.props.action === "NEW" ? 
      {
        teacher_id: _teacher_id,
        course_type: _course_type,
        course_level: _course_level,
        rate: _rate,
      } 
      :
      {
        _id: this.props.teacher_rate._id,
        teacher_id: _teacher_id,
        course_type: _course_type,
        course_level: _course_level,
        rate: _rate
      }
      this.props.onSubmit(_teacher_rate);
    }
  }

  render() {

    let teachersList = this.props.teachers.map((teacher, idx) => {
      return <option key={idx} value={teacher._id}>{teacher.lastname}{teacher.firstname}</option>;
    });

    let courseTypes = CLASS_TYPE.map((cla, idx) => {
      return <option key={idx} value={cla}>{cla}</option>;
    });

    let courseLevels = CLASS_LEVEL.map((cla, idx) => {
      return <option key={idx} value={cla}>{cla}</option>;
    });

    return(
      <div>
        <Row>
          <Col m={12} s={12}>
            <Card className='white no-margin' textClassName='black-text' title=''>

              <div className="row">
                <div className="input-field col s12 m4">
                  <select
                    ref={this.teacher_id}
                    id="teacher_id"
                    defaultValue={this.props.action === "EDIT" ? this.props.teacher_rate.teacher_id._id : "default"}
                  >
                    <option key="default" value="default" disabled>请选择教师</option>
                    {teachersList}
                  </select>
                  <label htmlFor="teacher_id">选择教师 <span className="required">*</span></label>
                </div>
                <div className="input-field col s12 m4">
                  <select
                    ref={this.course_type}
                    id="course_type"
                    defaultValue={this.props.action === "EDIT" ? this.props.teacher_rate.course_type : "default"}
                  >
                    <option key="default" value="default" disabled>请选择课程类型</option>
                    {courseTypes}
                  </select>
                  <label htmlFor="course_type">选择课程类型 <span className="required">*</span></label>
                </div>
                <div className="input-field col s12 m4">
                  <select
                    ref={this.course_level}
                    id="course_level"
                    defaultValue={this.props.action === "EDIT" ? this.props.teacher_rate.course_level : "default"}
                  >
                    <option key="default" value="default" disabled>请选择课程级别</option>
                    {courseLevels}
                  </select>
                  <label htmlFor="course_level">选择课程级别 <span className="required">*</span></label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12 m12">
                  <input 
                    defaultValue={this.props.action === "EDIT" ? this.props.teacher_rate.rate : null} 
                    ref={this.rate} 
                    id="rate" 
                    type="number" 
                    className="validate" 
                  />
                  <label htmlFor="rate">工资(元/课时/学生) <span className="required">*</span></label>
                </div>
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

export default TeacherRateInputForm;