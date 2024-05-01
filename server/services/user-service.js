class UserService {
  async statistics(user_id, date) {
    try {
      const [active_events] = await mysql.query(`
        SELECT events.id, events.reminder_date, events.reminder_date, events.content, events.title, events.importance FROM events 
        INNER JOIN calendars ON calendars.id = events.calendar_id
        INNER JOIN projects ON projects.id = calendars.project_id
        INNER JOIN project_user ON project_user.project_id = projects.id
        WHERE project_user.user_id = ${user_id} AND events.reminder_date > '${date}' ORDER BY events.reminder_date ASC;
      `);

      const [important_events] = await mysql.query(`
        SELECT events.id, events.reminder_date, events.reminder_date, events.content, events.title, events.importance FROM events 
        INNER JOIN calendars ON calendars.id = events.calendar_id
        INNER JOIN projects ON projects.id = calendars.project_id
        INNER JOIN project_user ON project_user.project_id = projects.id
        WHERE project_user.user_id = ${user_id} AND (events.importance = 3 OR events.importance = 2) ORDER BY events.importance DESC;
      `);

      const [completed_events] = await mysql.query(`
        SELECT events.id, events.reminder_date, events.reminder_date, events.content, events.title, events.importance FROM events 
        INNER JOIN calendars ON calendars.id = events.calendar_id
        INNER JOIN projects ON projects.id = calendars.project_id
        INNER JOIN project_user ON project_user.project_id = projects.id
        WHERE project_user.user_id = ${user_id} AND events.reminder_date < '${date}' ORDER BY events.reminder_date ASC;
      `);

      let hoursLeft, minutesLeft, secondsLeft;

      console.log(active_events.length)
      if (active_events.length) {
        const differenceMs = new Date(active_events[0].reminder_date) - new Date();
        hoursLeft = Math.floor(differenceMs / (1000 * 60 * 60));
        minutesLeft = Math.floor((differenceMs % (1000 * 60 * 60)) / (1000 * 60));
        secondsLeft = Math.floor((differenceMs % (1000 * 60)) / 1000);
      }

      return {
        active_events: active_events.length,
        important_events: important_events.length,
        completed_events: completed_events.length,
        hours_left: hoursLeft ? hoursLeft : 0,
        minutes_left: minutesLeft ? minutesLeft : 0,
        seconds_left: secondsLeft ? secondsLeft : 0
      };
    } catch (e) {
      throw new Error(e.message);
    }
  }
}

module.exports = new UserService();