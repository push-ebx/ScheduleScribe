const noteService = require('../services/note-service');

class NoteController {
  async createNote(req, res, next) {
    try {
      const {noteboard_id, content, importance} = req.body;
      const id = await noteService.createNote(noteboard_id, content, importance);
      return res.send({status: 'ok', success: true, message: 'Заметка успешно создана!', data: {id}});
    } catch (e) {
      next(e);
    }
  }

  async getNotes(req, res, next) {
    try {
      const notes = await noteService.getNotes(req.query.noteboard_id);
      return res.send({status: 'ok', success: true, data: notes});
    } catch (e) {
      next(e);
    }
  }

  async getNote(req, res, next) {
    try {
      const {note_id} = req.query;
      const note = await noteService.getNote(note_id);
      if (note) return res.send({status: 'ok', success: true, data: note});
      else return res.send({status: 'ok', success: false, message: "заметка с таким ID не найдена"});
    } catch (e) {
      next(e);
    }
  }

  async deleteNote(req, res, next) {
    const {id} = req.query;

    if (!id) {
      return res.status(400).send({status: 'error', success: false, message: 'Необходим идентификатор заметки'});
    }

    try {
      await noteService.deleteNote(id);
      return res.send({status: 'ok', success: true, message: 'Заметка успешно удалена'});
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new NoteController();