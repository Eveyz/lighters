import React from "react";
import Calendar from 'tui-calendar';

class CalendarContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      calendar: "",
    };
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
  
    $("#calendar-date").text(_time);
  };

  componentDidMount() {
    // initializing materialize dropdown component
    var elems = document.querySelectorAll('.dropdown-trigger');
    var instances = M.Dropdown.init(elems, {});

    // create calendar
    var ID = "#" + this.props.id;
    var _calendar = new Calendar(ID, {
      defaultView: 'week',
      taskView: false,    // can be also ['milestone', 'task']
      scheduleView: true,  // can be also ['allday', 'time']
      useCreationPopup: true,
      useDetailPopup: true,
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
        time: function(schedule) {
          return schedule.title + ' <i class="fa fa-refresh"></i>' + schedule.start;
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
      calendar: _calendar
    });
    this.renderCalendarTitle(_calendar.getDate(), _calendar.getDate(), _calendar.getDate(), _calendar.getViewName());

    _calendar.createSchedules([
      {
        id: '1',
        calendarId: '1',
        title: 'my schedule',
        category: 'time',
        dueDateClass: '',
        start: '2018-08-16T22:30:00+09:00',
        end: '2018-08-17T02:30:00+09:00'
      },
      {
        id: '2',
        calendarId: '1',
        title: 'second schedule',
        category: 'time',
        dueDateClass: '',
        start: '2018-08-31T17:30:00+09:00',
        end: '2018-08-31T18:31:00+09:00',
        isReadOnly: true    // schedule is read-only
      }
    ]);
  
    _calendar.on('clickDayname', function(event) {
      if (_calendar.getViewName() === 'week') {
        _calendar.setDate(new Date(event.date));
        _calendar.changeView('day', true);
      }
    });
  
    _calendar.on({
      'clickSchedule': function(e) {
        console.log('clickSchedule', e);
      },
      'beforeCreateSchedule': function(e) {
        console.log('beforeCreateSchedule', e);
        // open a creation popup
      },
      'beforeUpdateSchedule': function(e) {
        console.log('beforeUpdateSchedule', e);
        e.schedule.start = e.start;
        e.schedule.end = e.end;
        _calendar.updateSchedule(e.schedule.id, e.schedule.calendarId, e.schedule);
      },
      'beforeDeleteSchedule': function(e) {
        console.log('beforeDeleteSchedule', e);
        _calendar.deleteSchedule(e.schedule.id, e.schedule.calendarId);
      }
    });

    var currScope = this;
    
    $("#calendar-today-btn").on('click', function() {
      _calendar.today();
      currScope.renderCalendarTitle(_calendar.getDate(), _calendar.getDateRangeStart(), _calendar.getDateRangeEnd(), _calendar.getViewName());
    });
  
    $("#calendar-month").on('click', function() {
      _calendar.setOptions({month: {visibleWeeksCount: 6}}, true); // or null
      _calendar.changeView('month', true);
      currScope.renderCalendarTitle(_calendar.getDate(), _calendar.getDateRangeStart(), _calendar.getDateRangeEnd(), _calendar.getViewName());
    });
  
    $("#calendar-week").on('click', function() {
      _calendar.changeView('week', true);
      currScope.renderCalendarTitle(_calendar.getDate(), _calendar.getDateRangeStart(), _calendar.getDateRangeEnd(), _calendar.getViewName());
    });
  
    $("#calendar-two-week").on('click', function() {
      _calendar.setOptions({month: {visibleWeeksCount: 2}}, true);
      _calendar.changeView('month', true);
      currScope.renderCalendarTitle(_calendar.getDate(), _calendar.getDateRangeStart(), _calendar.getDateRangeEnd(), _calendar.getViewName());
    });
  
    $("#calendar-three-week").on('click', function() {
      _calendar.setOptions({month: {visibleWeeksCount: 3}}, true);
      _calendar.changeView('month', true);
      currScope.renderCalendarTitle(_calendar.getDate(), _calendar.getDateRangeStart(), _calendar.getDateRangeEnd(), _calendar.getViewName());
    });
  
    $("#calendar-day").on('click', function() {
      _calendar.changeView('day', true);
      currScope.renderCalendarTitle(_calendar.getDate(), _calendar.getDateRangeStart(), _calendar.getDateRangeEnd(), _calendar.getViewName());
    });
  
    $("#calendar-next").on('click', function() {
      _calendar.next();
      currScope.renderCalendarTitle(_calendar.getDate(), _calendar.getDateRangeStart(), _calendar.getDateRangeEnd(), _calendar.getViewName());
    });
  
    $("#calendar-prev").on('click', function() {
      _calendar.prev();
      currScope.renderCalendarTitle(_calendar.getDate(), _calendar.getDateRangeStart(), _calendar.getDateRangeEnd(), _calendar.getViewName());
    });
  }

  render() {
    return(
      <div>
        <div className="row no-margin">
          <div className="col m1">
            <a className='dropdown-trigger btn white black-text' href='#' data-target='dropdown1'>月</a>

            <ul id='dropdown1' className='dropdown-content'>
              <li><a href="javascript:;" id="calendar-month">月</a></li>
              <li><a href="javascript:;" id="calendar-week">周</a></li>
              <li><a href="javascript:;" id="calendar-day">日</a></li>
              <li><a href="javascript:;" id="calendar-two-week">2周</a></li>
              <li><a href="javascript:;" id="calendar-three-week">3周</a></li>
            </ul>
          </div>
          <div className="col m1 no-padding">
            <button id="calendar-today-btn" className="btn white black-text">今天</button>
          </div>
          <div className="col m2 no-padding">
            <div className="chip white m-box-shadow" style={{cursor: "pointer"}} id="calendar-prev">&lt;</div>
            <div className="chip white m-box-shadow" style={{cursor: "pointer"}} id="calendar-next">&gt;</div>
          </div>
          <div className="col m6"><h5 style={{marginTop: "5px"}} id="calendar-date" className="no-margin"></h5></div>
          <div className="col m2"></div>
        </div>
        <br/>
        <div id={this.props.id} className="calendar-height"></div>
      </div>
    );
  }
}

export default CalendarContainer;