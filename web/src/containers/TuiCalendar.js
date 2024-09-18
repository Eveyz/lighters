import React from "react";
import Calendar from 'tui-calendar';
import M from 'materialize-css';
import { connect } from 'react-redux';

import NewScheduleModal from './schedules/NewScheduleModal';
import EditScheduleModal from './schedules/EditScheduleModal';
import { getFullMinutes } from '../ultis'
import { getSchedules, addSchedule, deleteSchedule } from '../actions/schedules_actions';

class TuiCalendar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      calendar: "",
      date: "",
      show: false,
      mode: "NEW",
      event: {schedule: {title: "", end: {_date: ""}, start: {_date: ""} }}
    };

    this.calendarContainer = React.createRef();
    this.scheduleModal = React.createRef();

    this.calendarToday = this.calendarToday.bind(this);
    this.calendarDay = this.calendarDay.bind(this);
    this.calendarMonth = this.calendarMonth.bind(this);
    this.calendarWeek = this.calendarWeek.bind(this);
    this.calendarTwoWeek = this.calendarTwoWeek.bind(this);
    this.calendarThreeWeek = this.calendarThreeWeek.bind(this);
    this.calendarPrev = this.calendarPrev.bind(this);
    this.calendarPrev = this.calendarPrev.bind(this);
    this.calendarNext = this.calendarNext.bind(this);

    this.closeModal = this.closeModal.bind(this);
    this.saveSchedule = this.saveSchedule.bind(this);
    this.deleteSchedule = this.deleteSchedule.bind(this);
  }

  renderCalendarTitle(currTime, timeStart, timeEnd, mode) {
    var _time = '';
    var currTimeMonth = currTime.getMonth() + 1 < 10 ? "0" + (currTime.getMonth() + 1) : "" + (currTime.getMonth() + 1);
    var currTimeDay = currTime.getDate() < 10 ? "0" + currTime.getDate() : currTime.getDate();
  
    var timeStartMonth = timeStart.getMonth() + 1 < 10 ? "0" + (timeStart.getMonth() + 1) : "" + (timeStart.getMonth() + 1);
    var timeStartDay = timeStart.getDate() < 10 ? "0" + timeStart.getDate() : timeStart.getDate();
  
    var timeEndMonth = timeEnd.getMonth() + 1 < 10 ? "0" + (timeEnd.getMonth() + 1) : "" + (timeEnd.getMonth() + 1);
    var timeEndDay = timeEnd.getDate() < 10 ? "0" + timeEnd.getDate() : timeEnd.getDate();
  
    if(mode === "month") {
      _time = currTime.getFullYear() + '.' + currTimeMonth;
    } else if (mode === "week") {
      _time = timeStart.getFullYear() + '.' + timeStartMonth + '.' + timeStartDay + " ~ " + timeEndMonth + '.' + timeEndDay;
    } else if (mode === "day") {
      _time = currTime.getFullYear() + '.' + currTimeMonth + '.' + currTimeDay;
    };
    return _time;
  };

  componentDidMount() {
    // initializing materialize dropdown component
    M.AutoInit();
  
    // create calendar
    let _isReadOnly = this.props.isReadOnly;
    var _calendar = new Calendar(this.calendarContainer.current, {
      defaultView: 'week',
      taskView: false,    // can be also ['milestone', 'task']
      scheduleView: true,  // can be also ['allday', 'time']
      useCreationPopup: false,
      useDetailPopup: false,
      isReadOnly: _isReadOnly,
      template: {
        task: function(schedule) {
          return '&nbsp;&nbsp;#' + schedule.title;
        },
        taskTitle: function() {
          return '<label><input type="checkbox" />Task</label>';
        },
        allday: function(schedule) {
          return schedule.title + ' <i class="fa fa-refresh"></i>';
        },
        alldayTitle: function() {
          return 'All Day';
        },
        time: (schedule) => {
          let start_time = new Date(Date.parse(schedule.start._date));
          let end_time = new Date(Date.parse(schedule.end._date));
          return `<div><p class="white-text no-margin">${schedule.title} </p><p class="white-text no-margin">${start_time.getHours()}:${getFullMinutes(start_time)} ~ ${end_time.getHours()}:${getFullMinutes(end_time)}</p></div>`;
        }
      },
      month: {
        daynames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        startDayOfWeek: 0,
        narrowWeekend: false
      },
      week: {
        daynames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        startDayOfWeek: 0,
        narrowWeekend: false
      }
    });
    this.setState({
      calendar: _calendar,
      date: this.renderCalendarTitle(_calendar.getDate(), _calendar.getDateRangeStart(), _calendar.getDateRangeEnd(), _calendar.getViewName())
    });

    _calendar.createSchedules(this.props.schedulesData.schedules);
  
    _calendar.on('clickDayname', (event) => {
      if (_calendar.getViewName() === 'week') {
        _calendar.setDate(new Date(event.date));
        _calendar.changeView('day', true);
      }
    });

    let currScope = this;
    _calendar.on({
      'clickSchedule': function(e) {
        // console.log('clickSchedule', e);
        currScope.setState({
          show: true,
          event: e,
          mode: "EDIT"
        });
      },
      'beforeCreateSchedule': function(e) {
        // console.log('beforeCreateSchedule', e);
        // open a creation popup
        currScope.setState({
          show: true,
          event: e,
          mode: "NEW"
        });
      },
      'beforeUpdateSchedule': function(e) {
        // console.log('beforeUpdateSchedule', e);
        e.schedule.start = e.start;
        e.schedule.end = e.end;
        _calendar.updateSchedule(e.schedule.id, e.schedule.calendarId, e.schedule);
      },
      'beforeDeleteSchedule': function(e) {
        // console.log('beforeDeleteSchedule', e);
        _calendar.deleteSchedule(e.schedule.id, e.schedule.calendarId);
      }
    });
    // close modal if click outside of modal
    window.onclick = (e) => {
      if(e.target === this.scheduleModal.current && this.state.show) {
        this.setState({
          show: false
        })
        _calendar.createSchedules([]);
      }
    }
  }

  calendarToday() {
    let _calendar = this.state.calendar;
    if(_calendar) {
      _calendar.today();
      this.setState({
        date: this.renderCalendarTitle(_calendar.getDate(), _calendar.getDateRangeStart(), _calendar.getDateRangeEnd(), _calendar.getViewName())
      });
    }
  };

  calendarMonth(e) {
    e.preventDefault();
    let _calendar = this.state.calendar;
    if(_calendar) {
      _calendar.setOptions({month: {visibleWeeksCount: 6}}, true); // or null
      _calendar.changeView('month', true);
      this.setState({
        date: this.renderCalendarTitle(_calendar.getDate(), _calendar.getDateRangeStart(), _calendar.getDateRangeEnd(), _calendar.getViewName())
      });
    }
  };

  calendarWeek(e) {
    e.preventDefault();
    let _calendar = this.state.calendar;
    if(_calendar) {
      _calendar.changeView('week', true);
      this.setState({
        date: this.renderCalendarTitle(_calendar.getDate(), _calendar.getDateRangeStart(), _calendar.getDateRangeEnd(), _calendar.getViewName())
      });
    }
  };

  calendarTwoWeek(e) {
    e.preventDefault();
    let _calendar = this.state.calendar;
    if(_calendar) {
      _calendar.setOptions({month: {visibleWeeksCount: 2}}, true);
      _calendar.changeView('month', true);
      this.setState({
        date: this.renderCalendarTitle(_calendar.getDate(), _calendar.getDateRangeStart(), _calendar.getDateRangeEnd(), _calendar.getViewName())
      });
    }
  };

  calendarThreeWeek(e) {
    e.preventDefault();
    let _calendar = this.state.calendar;
    if(_calendar) {
      _calendar.setOptions({month: {visibleWeeksCount: 3}}, true);
      _calendar.changeView('month', true);
      this.setState({
        date: this.renderCalendarTitle(_calendar.getDate(), _calendar.getDateRangeStart(), _calendar.getDateRangeEnd(), _calendar.getViewName())
      });
    }
  };

  calendarDay(e) {
    e.preventDefault();
    let _calendar = this.state.calendar;
    if(_calendar) {
      _calendar.changeView('day', true);
      this.setState({
        date: this.renderCalendarTitle(_calendar.getDate(), _calendar.getDateRangeStart(), _calendar.getDateRangeEnd(), _calendar.getViewName())
      });
    }
  };

  calendarNext() {
    let _calendar = this.state.calendar;
    if(_calendar) {
      _calendar.next();
      this.setState({
        date: this.renderCalendarTitle(_calendar.getDate(), _calendar.getDateRangeStart(), _calendar.getDateRangeEnd(), _calendar.getViewName())
      });
    }
  };

  calendarPrev() {
    let _calendar = this.state.calendar;
    if(_calendar) {
      _calendar.prev();
      this.setState({
        date: this.renderCalendarTitle(_calendar.getDate(), _calendar.getDateRangeStart(), _calendar.getDateRangeEnd(), _calendar.getViewName())
      });
    }
  };

  closeModal() {
    if(this.state.show) {
      this.setState({show: false});
    }
    this.state.calendar.createSchedules([]);
  }

  saveSchedule(schedule) {
    this.state.calendar.createSchedules([schedule]);
    this.props.addSchedule(schedule);
  }

  deleteSchedule(event) {
    let id = "";
    this.props.schedulesData.schedules.forEach((s) => {
      if(event.schedule.id === s.id) {
        id = s._id;
      }
    })
    if(id) {
      this.state.calendar.deleteSchedule(event.schedule.id, event.schedule.calendarId);
      this.props.deleteSchedule(id);
    }
  }

  render() {
    let len = this.props.schedulesData.schedules.length;
    let nextScheduleID = 1;
    if(len > 0) {
      nextScheduleID = +this.props.schedulesData.schedules[len - 1].id + 1;
    }
    let newModal = this.state.show && this.state.mode === "NEW" ? <NewScheduleModal 
      refFromParent={this.scheduleModal}
      scheduleID={String(nextScheduleID)}
      show={this.state.show && this.state.mode === "NEW"} 
      event={this.state.event}
      closeModal={this.closeModal}
      saveSchedule={this.saveSchedule}
      courses={this.props.courses}
    /> : "";
    let editModal = this.state.show && this.state.mode === "EDIT" ? <EditScheduleModal 
      refFromParent={this.scheduleModal} 
      show={this.state.show && this.state.mode === "EDIT"} 
      event={this.state.event}
      closeModal={this.closeModal}
      deleteSchedule={this.deleteSchedule}
    /> : "";

    return(
      <div>
        <div className="row no-margin">
          <div className="col m1">
            <a className='dropdown-trigger btn white black-text' data-target='dropdown1'>周</a>

            <ul id='dropdown1' className='dropdown-content'>
              <li><a onClick={this.calendarMonth}>月</a></li>
              <li><a onClick={this.calendarWeek}>周</a></li>
              <li><a onClick={this.calendarDay}>日</a></li>
              <li><a onClick={this.calendarTwoWeek}>2周</a></li>
              <li><a onClick={this.calendarThreeWeek}>3周</a></li>
            </ul>
          </div>
          <div className="col m1 no-padding">
            <button className="btn white black-text" onClick={this.calendarToday}>今天</button>
          </div>
          <div className="col m2 no-padding">
            <div className="chip white m-box-shadow" style={{cursor: "pointer"}} onClick={this.calendarPrev}>&lt;</div>
            <div className="chip white m-box-shadow" style={{cursor: "pointer"}} onClick={this.calendarNext}>&gt;</div>
          </div>
          <div className="col m6"><h5 style={{marginTop: "5px"}}  className="no-margin">{this.state.date}</h5></div>
          <div className="col m2"></div>
        </div>
        <br/>
        {newModal}
        {editModal}
        <div ref={this.calendarContainer} className="calendar-height"></div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user_id: state.auth.user.userTokenData.id,
    courses: state.auth.identityData.courses.map((course) => {
      return {name: course.name, course_id: course._id}
    }),
    schedulesData: state.schedulesData
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addSchedule: (schedule) => dispatch(addSchedule(schedule)),
    deleteSchedule: (id) => dispatch(deleteSchedule(id)),
    getSchedules: (courses_ids) => dispatch(getSchedules(courses_ids))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TuiCalendar);