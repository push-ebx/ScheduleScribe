const {v4: uuidv4} = require('uuid');

class NoteService {
  async createNote(noteboard_id, content, importance, user_id, title) {
    try {
      const note_id = uuidv4();
      await mysql.query(`INSERT INTO notes (id, noteboard_id, content, importance, creation_date, user_id, title) VALUES ('${note_id}', '${noteboard_id}', '${content}', '${importance}', NOW(), '${user_id}', '${title}')`);
      return {id: note_id, creation_date: new Date().getDate()};
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async getUserNotes(user_id) {
    try {
      const [notes] = await mysql.query(`
        SELECT notes.id, notes.creation_date, notes.content, notes.title, notes.importance FROM notes 
        INNER JOIN noteboards ON noteboards.id = notes.noteboard_id
        INNER JOIN projects ON projects.id = noteboards.project_id
        INNER JOIN project_user ON project_user.project_id = projects.id
        WHERE project_user.user_id = ${user_id} ORDER BY notes.importance DESC;
      `);
      return notes;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async getNotes(noteboard_id) {
    try {
      const [notes] = await mysql.query(`SELECT users.username, users.url, notes.content, notes.id, notes.importance, notes.creation_date, notes.title FROM notes INNER JOIN users ON notes.user_id=users.id WHERE noteboard_id='${noteboard_id}'`);
      return notes;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async getNote(note_id) {
    try {
      const [[note]] = await mysql.query(`SELECT * FROM notes WHERE id='${note_id}'`);
      return note;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async deleteNote(note_id) {
    try {
      await mysql.query(`DELETE FROM notes WHERE id='${note_id}'`);
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async changeImportance(note_id, importance) {
    try {
      await mysql.query(`UPDATE notes SET importance='${importance}' WHERE id='${note_id}'`);
    } catch (e) {
      throw new Error(e.message);
    }
  }
}

module.exports = new NoteService();