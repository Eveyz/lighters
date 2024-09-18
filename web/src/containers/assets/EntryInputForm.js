import React from 'react';
import { Row, Col, Card } from 'react-materialize';
import M from 'materialize-css';
import { CLASS_TYPE, CLASS_LEVEL, TEACHER_LEVEL } from '../../ultis';

class EntryInputForm extends React.Component {
  constructor(props) {
    super(props)

    this.level = React.createRef();
    this.courseLevel = React.createRef();
    this.salary = React.createRef();
    this.type = React.createRef();

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
    let _level = this.level.current.value
    let _rate = this.salary.current.value
    let _course_level = this.courseLevel.current.value
    let _type = this.type.current.value
    if(!_level || !_rate || !_type || !_course_level) {
      window.Materialize.toast('等级或者工资不能为空', 1000);
    } else {
      let _entry = this.props.action === "NEW" ? 
      {
        level: _level,
        rate: _rate,
        type: _type,
        course_level: _course_level
      } 
      :
      {
        _id: this.props.entry._id,
        level: _level,
        rate: _rate,
        type: _type,
        course_level: _course_level
      } 
      this.props.onSubmit(_entry);
    }
  }

  render() {

    let teacherLevels = TEACHER_LEVEL.map((lvl, idx) => {
      return <option key={idx} value={lvl}>{lvl}</option>;
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
                    ref={this.level}
                    defaultValue={this.props.entry.level}
                    id="level"
                  >
                    <option key="default" value="default" disabled>请选择课程类型</option>
                    {teacherLevels}
                  </select>
                  <label htmlFor="level">教师等级 <span className="required">*</span></label>
                </div>
                <div className="input-field col s12 m4">
                  <select
                    ref={this.courseLevel}
                    id="course_level"
                    defaultValue={this.props.entry.course_level}
                  >
                    <option key="default" value="default" disabled>请选择课程等级</option>
                    {courseLevels}
                  </select>
                  <label htmlFor="course_level">课程等级 <span className="required">*</span></label>
                </div>
                <div className="input-field col s12 m4">
                  <select
                    ref={this.type}
                    id="type"
                    defaultValue={this.props.entry.type}
                  >
                    <option key="default" value="default" disabled>请选择课程类型</option>
                    {courseTypes}
                  </select>
                  <label htmlFor="type">课程类型 <span className="required">*</span></label>
                </div>
                <div className="input-field col s12 m12">
                  <input 
                    defaultValue={this.props.entry.rate} 
                    ref={this.salary} 
                    id="wage" 
                    type="number" 
                    className="validate" 
                  />
                  <label htmlFor="wage">工资每课时/人民币 <span className="required">*</span></label>
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

export default EntryInputForm;