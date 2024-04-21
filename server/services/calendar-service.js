const {v4: uuidv4} = require('uuid');

class CalendarService {
  async createCalendar(title, description, project_id) {
    try {
      const calendar_id = uuidv4();
      await mysql.query(`INSERT INTO calendars (id, title, description, project_id) VALUES ('${calendar_id}', '${title}', '${description}', '${project_id}')`);
      return calendar_id;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async getCalendars(project_id) {
    try {
      const [calendars] = await mysql.query(`SELECT * FROM calendars WHERE project_id='${project_id}'`);
      return calendars;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async getCalendar(calendar_id) {
    try {
      const [[calendar]] = await mysql.query(`SELECT * FROM calendars WHERE id='${calendar_id}'`);
      return calendar;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async deleteCalendar(calendar_id) {
    try {
      await mysql.query(`DELETE FROM calendars WHERE id='${calendar_id}'`);
    } catch (e) {
      throw new Error(e.message);
    }
  }
}

module.exports = new CalendarService();