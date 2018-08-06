var initialize_calendar;
initialize_calendar = function() {
  $(".calendar").each(function() {
    var calendar = $(this);
    calendar.fullCalendar({
      defaultView: 'month',
      locale: 'zh-cn',
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      },
      selectable: true,
      selectHelper: true,
      editable: true,
      eventLimit: true,
    });
  });
};

// $(document).on('turbolinks:load', initialize_calendar);