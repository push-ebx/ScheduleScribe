const noteboardService = require('../services/noteboard-service');

class NoteboardController {
  async createNoteboard(req, res, next) {
    try {
      const {title, description, project_id} = req.body;
      const id = await noteboardService.createNoteboard(title, description, project_id);
      return res.send({status: 'ok', success: true, message: 'Доска заметок успешно создана!', data: {id}});
    } catch (e) {
      next(e);
    }
  }

  async getNoteboards(req, res, next) {
    try {
      const noteboards = await noteboardService.getNoteboards(req.query.project_id);
      return res.send({status: 'ok', success: true, data: noteboards});
    } catch (e) {
      next(e);
    }
  }

  async getNoteboard(req, res, next) {
    try {
      const {noteboard_id} = req.query;
      const noteboard = await noteboardService.getNoteboard(noteboard_id);
      if (noteboard) return res.send({status: 'ok', success: true, data: noteboard});
      else return res.send({status: 'ok', success: false, message: "Доска заметок с таким ID не найдена"});
    } catch (e) {
      next(e);
    }
  }

  async deleteNoteboard(req, res, next) {
    const {id} = req.query;

    if (!id) {
      return res.status(400).send({status: 'error', success: false, message: 'Необходим идентификатор доски проектов'});
    }

    try {
      await noteboardService.deleteNoteboard(id);
      return res.send({status: 'ok', success: true, message: 'Доска заметок успешно удалена'});
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new NoteboardController();