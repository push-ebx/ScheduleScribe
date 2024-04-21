const calendarService = require('../services/calendar-service');

class CalendarController {
  async createCalendar(req, res, next) {
    try {
      const { title, description, project_id } = req.body;
      const id = await calendarService.createCalendar(title, description, project_id);
      return res.send({ status: 'ok', success: true, message: 'Календарь успешно создан!', data: { id } });
    } catch (e) {
      next(e);
    }
  }

  async getCalendars(req, res, next) {
    try {
      const calendars = await calendarService.getCalendars(req.query.project_id);
      return res.send({ status: 'ok', success: true, data: calendars });
    } catch (e) {
      next(e);
    }
  }

  async getCalendar(req, res, next) {
    try {
      const { calendar_id } = req.query;
      const calendar = await calendarService.getCalendar(calendar_id);
      if (calendar) return res.send({ status: 'ok', success: true, data: calendar });
      else return res.send({ status: 'ok', success: false, message: "Календарь с таким ID не найден" });
    } catch (e) {
      next(e);
    }
  }

  async deleteCalendar(req, res, next) {
    const { id } = req.query;

    if (!id) {
      return res.status(400).send({ status: 'error', success: false, message: 'Необходим идентификатор календаря' });
    }

    try {
      await calendarService.deleteCalendar(id);
      return res.send({ status: 'ok', success: true, message: 'Календарь успешно удален' });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new CalendarController();