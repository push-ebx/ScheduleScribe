const {v4: uuidv4} = require('uuid');

class NoteboardService {
  async createNoteboard(title, description, project_id) {
    try {
      const noteboard_id = uuidv4();
      await mysql.query(`INSERT INTO noteboards (id, title, description, project_id) VALUES ('${noteboard_id}', '${title}', '${description}', '${project_id}')`);
      return noteboard_id;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async getNoteboards(project_id) {
    try {
      const [noteboards] = await mysql.query(`SELECT * FROM noteboards WHERE project_id='${project_id}'`);
      return noteboards;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async getNoteboard(noteboard_id) {
    try {
      const [[noteboard]] = await mysql.query(`SELECT * FROM noteboards WHERE id='${noteboard_id}'`);
      return noteboard;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async deleteNoteboard(noteboard_id) {
    try {
      await mysql.query(`DELETE FROM noteboards WHERE id='${noteboard_id}'`);
    } catch (e) {
      throw new Error(e.message);
    }
  }
}

module.exports = new NoteboardService();