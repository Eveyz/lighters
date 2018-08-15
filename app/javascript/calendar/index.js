// import Calendar from 'tui-calendar';

// function renderCalendarTitle(currTime, timeStart, timeEnd, mode) {
//   var _time = '';
//   var currTimeMonth = currTime.getMonth() + 1 < 10 ? "0" + (currTime.getMonth() + 1) : "" + (currTime.getMonth() + 1);
//   var currTimeDay = currTime.getDate() < 10 ? "0" + currTime.getDate() : currTime.getDate();

//   var timeStartMonth = timeStart.getMonth() + 1 < 10 ? "0" + (timeStart.getMonth() + 1) : "" + (timeStart.getMonth() + 1);
//   var timeStartDay = timeStart.getDate() < 10 ? "0" + timeStart.getDate() : timeStart.getDate();

//   var timeEndMonth = timeEnd.getMonth() + 1 < 10 ? "0" + (timeEnd.getMonth() + 1) : "" + (timeEnd.getMonth() + 1);
//   var timeEndDay = timeEnd.getDate() < 10 ? "0" + timeEnd.getDate() : timeEnd.getDate();

//   if(mode === "month") {
//     _time = currTime.getFullYear() + '.' + currTimeMonth;
//   } else if (mode === "week") {
//     _time = timeStart.getFullYear() + '.' + timeStartMonth + '.' + timeStartDay + " ~ " + timeEndMonth + '.' + timeEndDay;
//   } else if (mode === "day") {
//     _time = currTime.getFullYear() + '.' + currTimeMonth + '.' + currTimeDay;
//   };

//   $("#calendar-date").text(_time);
// };

// $(document).on("ready", function() {
//   console.log("here we go");
//   var calendar = new Calendar('#course-calendar', {
//     defaultView: 'week',
//     taskView: false,    // can be also ['milestone', 'task']
//     scheduleView: true,  // can be also ['allday', 'time']
//     useCreationPopup: true,
//     useDetailPopup: true,
//     template: {
//       task: function(schedule) {
//         return '&nbsp;&nbsp;#' + schedule.title;
//       },
//       taskTitle: function() {
//         return '<label><input type="checkbox" />Task</label>';
//       },
//       allday: function(schedule) {
//         return schedule.title + ' <i class="fa fa-refresh"></i>';
//       },
//       alldayTitle: function() {
//         return 'All Day';
//       },
//       time: function(schedule) {
//         return schedule.title + ' <i class="fa fa-refresh"></i>' + schedule.start;
//       }
//     },
//     month: {
//       daynames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
//       startDayOfWeek: 0,
//       narrowWeekend: false
//     },
//     week: {
//       daynames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
//       startDayOfWeek: 0,
//       narrowWeekend: false
//     }
//   });

//   // set default date for calendar
//   renderCalendarTitle(calendar.getDate(), calendar.getDate(), calendar.getDate(), calendar.getViewName());

//   calendar.createSchedules([
//     {
//       id: '1',
//       calendarId: '1',
//       title: 'my schedule',
//       category: 'time',
//       dueDateClass: '',
//       start: '2018-08-16T22:30:00+09:00',
//       end: '2018-08-17T02:30:00+09:00'
//     },
//     {
//       id: '2',
//       calendarId: '1',
//       title: 'second schedule',
//       category: 'time',
//       dueDateClass: '',
//       start: '2018-08-31T17:30:00+09:00',
//       end: '2018-08-31T18:31:00+09:00',
//       isReadOnly: true    // schedule is read-only
//     }
//   ]);

//   calendar.on('clickDayname', function(event) {
//     if (calendar.getViewName() === 'week') {
//       calendar.setDate(new Date(event.date));
//       calendar.changeView('day', true);
//     }
//   });

//   calendar.on({
//     'clickSchedule': function(e) {
//       console.log('clickSchedule', e);
//     },
//     'beforeCreateSchedule': function(e) {
//       console.log('beforeCreateSchedule', e);
//       // open a creation popup
//     },
//     'beforeUpdateSchedule': function(e) {
//       console.log('beforeUpdateSchedule', e);
//       e.schedule.start = e.start;
//       e.schedule.end = e.end;
//       calendar.updateSchedule(e.schedule.id, e.schedule.calendarId, e.schedule);
//     },
//     'beforeDeleteSchedule': function(e) {
//       console.log('beforeDeleteSchedule', e);
//       calendar.deleteSchedule(e.schedule.id, e.schedule.calendarId);
//     }
//   });
  
//   $("#calendar-today-btn").on('click', function() {
//     calendar.today();
//     renderCalendarTitle(calendar.getDate(), calendar.getDateRangeStart(), calendar.getDateRangeEnd(), calendar.getViewName());
//   });

//   $("#calendar-month").on('click', function() {
//     calendar.setOptions({month: {visibleWeeksCount: 6}}, true); // or null
//     calendar.changeView('month', true);
//     renderCalendarTitle(calendar.getDate(), calendar.getDateRangeStart(), calendar.getDateRangeEnd(), calendar.getViewName());
//   });

//   $("#calendar-week").on('click', function() {
//     calendar.changeView('week', true);
//     renderCalendarTitle(calendar.getDate(), calendar.getDateRangeStart(), calendar.getDateRangeEnd(), calendar.getViewName());
//   });

//   $("#calendar-two-week").on('click', function() {
//     calendar.setOptions({month: {visibleWeeksCount: 2}}, true);
//     calendar.changeView('month', true);
//     renderCalendarTitle(calendar.getDate(), calendar.getDateRangeStart(), calendar.getDateRangeEnd(), calendar.getViewName());
//   });

//   $("#calendar-three-week").on('click', function() {
//     calendar.setOptions({month: {visibleWeeksCount: 3}}, true);
//     calendar.changeView('month', true);
//     renderCalendarTitle(calendar.getDate(), calendar.getDateRangeStart(), calendar.getDateRangeEnd(), calendar.getViewName());
//   });

//   $("#calendar-day").on('click', function() {
//     calendar.changeView('day', true);
//     renderCalendarTitle(calendar.getDate(), calendar.getDateRangeStart(), calendar.getDateRangeEnd(), calendar.getViewName());
//   });

//   $("#calendar-next").on('click', function() {
//     calendar.next();
//     renderCalendarTitle(calendar.getDate(), calendar.getDateRangeStart(), calendar.getDateRangeEnd(), calendar.getViewName());
//   });

//   $("#calendar-prev").on('click', function() {
//     calendar.prev();
//     renderCalendarTitle(calendar.getDate(), calendar.getDateRangeStart(), calendar.getDateRangeEnd(), calendar.getViewName());
//   });
// });