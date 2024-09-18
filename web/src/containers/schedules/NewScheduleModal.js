import React from 'react';
import M from 'materialize-css';

class NewScheduleModal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      show: this.props.show || false
    }

    this.modal = React.createRef();
    this.close = React.createRef();
    this.courseValue = React.createRef();

    this.closeModal = this.closeModal.bind(this);
    this.saveSchedule = this.saveSchedule.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if(nextProps.show && !prevState.show) {
      return { show: nextProps.show }
    }
    if(!nextProps.show && prevState.show) {
      return { show: nextProps.show }
    }
    return null;
  }

  componentDidMount() {
    M.AutoInit();
  }
  

  componentDidUpdate(prevProps, prevState) {
    if(this.props.show && !prevState.show) {
      this.setState({show: true})
    }
  }

  closeModal() {
    this.props.closeModal();
  }

  saveSchedule() {
    let course = JSON.parse(this.courseValue.current.value);
    if(course) {
      let schedule = {
        course_id: course.course_id,
        id: `${this.props.scheduleID}`,
        calendarId: '1',
        title: course.name,
        category: 'time',
        dueDateClass: '',
        start: this.props.event.start.toUTCString(),
        end: this.props.event.end.toUTCString(),
        isReadOnly: true
      }
      this.props.saveSchedule(schedule);
    }
    this.props.closeModal();
  }

  render() {
    const modalHidden = this.state.show ? {display: "block"} : {display: "none"};
    const prompt = <option value="default" disabled>请选择课程</option>;
    const options = this.props.courses.map((course, idx) => {
      return <option key={idx} value={JSON.stringify(course)}>{course.name}</option>
    });

    return(
      <div ref={this.props.refFromParent} className="custom-modal" style={modalHidden}>

        <div className="custom-modal-content" style={{width: "40%", padding: "0px 20px 15px 40px"}}>
          <span className="custom-close" onClick={this.closeModal}>&times;</span>
          <div className="row">
            <div className="input-field col s12">
              <select
                ref={this.courseValue}
              >
                {prompt}
                {options}
              </select>
              <label>请选择课程</label>
            </div>
          </div>
          <button className="btn blue white-text" onClick={this.saveSchedule}>保存</button>
        </div>

      </div>
    )
  }
}

export default NewScheduleModal;