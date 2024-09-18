import React from 'react';
import M from 'materialize-css';

import { getFullMinutes } from '../../ultis'

class EditScheduleModal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      show: this.props.show || false
    }

    this.closeModal = this.closeModal.bind(this);
    this.deleteSchedule = this.deleteSchedule.bind(this);
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

  deleteSchedule() {
    this.props.deleteSchedule(this.props.event);
    this.props.closeModal();
  }

  render() {
    const modalHidden = this.state.show ? {display: "block"} : {display: "none"};

    let start_time = new Date(Date.parse(this.props.event.schedule.start._date));
    let end_time = new Date(Date.parse(this.props.event.schedule.end._date));

    return(
      <div ref={this.props.refFromParent} className="custom-modal" style={modalHidden}>

        <div className="custom-modal-content" style={{width: "40%", padding: "0px 20px 15px 40px"}}>
          <span className="custom-close" onClick={this.closeModal}>&times;</span>
          <div className="row">
            <div className="input-field col s12 no-margin">
              <h5>{this.props.event.schedule.title}</h5>
              <p>上课时间: {start_time.getHours()}:{getFullMinutes(start_time)} ~ {end_time.getHours()}:{getFullMinutes(end_time)}</p>
            </div>
          </div>
          <button className="btn red white-text" onClick={this.deleteSchedule}>删除</button>
        </div>

      </div>
    )
  }
}

export default EditScheduleModal;