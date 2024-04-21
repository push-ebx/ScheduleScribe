const {v4: uuidv4} = require('uuid');

class EventService {
  async createEvent(calendar_id, reminder_date, content, title) {
    try {
      const event_id = uuidv4();
      await mysql.query(`INSERT INTO events (id, calendar_id, reminder_date, content, title) VALUES ('${event_id}', '${calendar_id}', CAST('${reminder_date}' AS DateTime), '${content}', '${title}')`);
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