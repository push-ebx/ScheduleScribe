const {v4: uuidv4} = require('uuid');

class EventService {
  async createEvent(calendar_id, reminder_date, content, title, importance) {
    try {
      const event_id = uuidv4();
      await mysql.query(`INSERT INTO events (id, calendar_id, reminder_date, content, title, importance) VALUES ('${event_id}', '${calendar_id}', '${reminder_date}', '${content}', '${title}', '${importance}')`);
      return event_id;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async getEvents(calendar_id) {
    try {
      const [events] = await mysql.query(`SELECT * FROM events WHERE calendar_id='${calendar_id}'`);
      return events;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async getImportantEvents(user_id) {
    try {
      const [events] = await mysql.query(`
        SELECT events.id, events.reminder_date, events.reminder_date, events.content, events.title, events.importance FROM events 
        INNER JOIN calendars ON calendars.id = events.calendar_id
        INNER JOIN projects ON projects.id = calendars.project_id
        INNER JOIN project_user ON project_user.project_id = projects.id
        WHERE project_user.user_id = ${user_id} AND (events.importance = 3 OR events.importance = 2) ORDER BY events.importance DESC;
      `);
      return events;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async eventsAfterDate(user_id, date) {
    try {
      const [events] = await mysql.query(`
        SELECT events.id, events.reminder_date, events.reminder_date, events.content, events.title, events.importance FROM events 
        INNER JOIN calendars ON calendars.id = events.calendar_id
        INNER JOIN projects ON projects.id = calendars.project_id
        INNER JOIN project_user ON project_user.project_id = projects.id
        WHERE project_user.user_id = ${user_id} AND events.reminder_date > '${date}' ORDER BY events.reminder_date ASC;
      `);
      return events;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async getEvent(event_id) {
    try {
      const [[event]] = await mysql.query(`SELECT * FROM events WHERE id='${event_id}'`);
      return event;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async deleteEvent(event_id) {
    try {
      await mysql.query(`DELETE FROM events WHERE id='${event_id}'`);
    } catch (e) {
      throw new Error(e.message);
    }
  }
}

module.exports = new EventService();