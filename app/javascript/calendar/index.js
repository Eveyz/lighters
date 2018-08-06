import Calendar from 'tui-calendar';

$(document).on("ready", function() {
  var calendar = new Calendar('#student-calendar', {
    defaultView: 'month',
    taskView: false,    // can be also ['milestone', 'task']
    scheduleView: false,  // can be also ['allday', 'time']
    useCreationPopup: true,
    useDetailPopup: true,
  });
});