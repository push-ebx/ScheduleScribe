const eventService = require('../services/event-service');

class EventController {
  async createEvent(req, res, next) {
    try {
      const {calendar_id, reminder_date, content, title, importance} = req.body;
      const id = await eventService.createEvent(calendar_id, reminder_date, content, title, importance);
      return res.send({status: 'ok', success: true, message: 'Событие успешно создано!', data: {id}});
    } catch (e) {
      next(e);
    }
  }

  async getEvents(req, res, next) {
    try {
      const events = await eventService.getEvents(req.query.calendar_id);
      return res.send({status: 'ok', success: true, data: events});
    } catch (e) {
      next(e);
    }
  }

  async getImportantEvents(req, res, next) {
    try {
      const events = await eventService.getImportantEvents(req.user_id);
      return res.send({status: 'ok', success: true, data: events});
    } catch (e) {
      next(e);
    }
  }

  async eventsAfterDate(req, res, next) {
    try {
      const events = await eventService.eventsAfterDate(req.user_id, req.query.date);
      return res.send({status: 'ok', success: true, data: events});
    } catch (e) {
      next(e);
    }
  }

  async eventsByDate(req, res, next) {
    try {
      const events = await eventService.eventsByDate(req.user_id, req.query.date);
      return res.send({status: 'ok', success: true, data: events});
    } catch (e) {
      next(e);
    }
  }

  async getEvent(req, res, next) {
    try {
      const {event_id} = req.query;
      const event = await eventService.getEvent(event_id);
      if (event) return res.send({status: 'ok', success: true, data: event});
      else return res.send({status: 'ok', success: false, message: "Событие с таким ID не найдено"});
    } catch (e) {
      next(e);
    }
  }

  async deleteEvent(req, res, next) {
    const {id} = req.query;

    if (!id) {
      return res.status(400).send({status: 'error', success: false, message: 'Необходим идентификатор события'});
    }

    try {
      await eventService.deleteEvent(id);
      return res.send({status: 'ok', success: true, message: 'Событие успешно удалено'});
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new EventController();