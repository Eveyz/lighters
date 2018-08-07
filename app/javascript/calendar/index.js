import Calendar from 'tui-calendar';

$(document).on("ready", function() {

  function renderCalendarTitle(timeStart, timeEnd, mode) {
    console.log(timeStart);
    console.log(timeEnd);

    var text = '';
    if(mode === "month") {
      text = timeStart.getFullYear() + '.' + timeStart.getMonth();
    } else if (mode === "week") {
      text = timeStart.getFullYear() + '.' + timeStart.getMonth() + '.' + timeStart.getDay() + " ~ " + timeStart.getMonth() + '.' + timeStart.getDay();
    } else if (mode === "day") {
      text = timeStart.getFullYear() + '.' + timeStart.getMonth() + '.' + timeStart.getDay();
    };

    $("#student-calendar-date").text(text);
  };

  var calendar = new Calendar('#student-calendar', {
    defaultView: 'month',
    taskView: false,    // can be also ['milestone', 'task']
    scheduleView: true,  // can be also ['allday', 'time']
    useCreationPopup: false,
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

  renderCalendarTitle(calendar.getDateRangeStart(), calendar.getDateRangeEnd(), calendar.getViewName());

  calendar.createSchedules([
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
      start: '2018-08-18T17:30:00+09:00',
      end: '2018-08-18T18:31:00+09:00',
      isReadOnly: true    // schedule is read-only
    }
  ]);

  calendar.on('clickDayname', function(event) {
    if (calendar.getViewName() === 'week') {
      calendar.setDate(new Date(event.date));
      calendar.changeView('day', true);
    }
  });

  calendar.on({
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
      cal.updateSchedule(e.schedule.id, e.schedule.calendarId, e.schedule);
    },
    'beforeDeleteSchedule': function(e) {
      console.log('beforeDeleteSchedule', e);
      cal.deleteSchedule(e.schedule.id, e.schedule.calendarId);
    }
  });
  
  $("#student-today-btn").on('click', function() {
    calendar.today();
    renderCalendarTitle(calendar.getDateRangeStart(), calendar.getDateRangeEnd(), calendar.getViewName());
  });

  $("#student-month").on('click', function() {
    calendar.setOptions({month: {visibleWeeksCount: 6}}, true); // or null
    calendar.changeView('month', true);
    renderCalendarTitle(calendar.getDateRangeStart(), calendar.getDateRangeEnd(), calendar.getViewName());
  });

  $("#student-week").on('click', function() {
    calendar.changeView('week', true);
    console.log(calendar.getDateRangeStart().toUTCString());
    console.log(calendar.getDateRangeEnd().toUTCString());
    renderCalendarTitle(calendar.getDateRangeStart(), calendar.getDateRangeEnd(), calendar.getViewName());
  });

  $("#student-two-week").on('click', function() {
    calendar.setOptions({month: {visibleWeeksCount: 2}}, true);
    calendar.changeView('month', true);
    renderCalendarTitle(calendar.getDateRangeStart(), calendar.getDateRangeEnd(), calendar.getViewName());
  });

  $("#student-three-week").on('click', function() {
    calendar.setOptions({month: {visibleWeeksCount: 3}}, true);
    calendar.changeView('month', true);
    renderCalendarTitle(calendar.getDateRangeStart(), calendar.getDateRangeEnd(), calendar.getViewName());
  });

  $("#student-day").on('click', function() {
    calendar.changeView('day', true);
    renderCalendarTitle(calendar.getDateRangeStart(), calendar.getDateRangeEnd(), calendar.getViewName());
  });

  $("#student-next").on('click', function() {
    calendar.next();
    renderCalendarTitle(calendar.getDateRangeStart(), calendar.getDateRangeEnd(), calendar.getViewName());
  });

  $("#student-prev").on('click', function() {
    calendar.prev();
    renderCalendarTitle(calendar.getDateRangeStart(), calendar.getDateRangeEnd(), calendar.getViewName());
  });
});