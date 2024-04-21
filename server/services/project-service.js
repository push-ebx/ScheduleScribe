const { v4: uuidv4 } = require('uuid');

class ProjectService {
  async createProject(title, description, user_id) {
    try {
      const projectId = uuidv4();
      await mysql.query(`INSERT INTO projects (id, title, description, creation_date) VALUES ('${projectId}', '${title}', '${description}', NOW())`);
      await mysql.query(`INSERT INTO project_user (user_id, project_id) VALUES ('${user_id}', '${projectId}')`);
      return projectId;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async addProject(user_id, project_id) {
    try {
      const [existingProject] = await mysql.query(`SELECT * FROM project_user WHERE user_id='${user_id}' AND project_id='${project_id}'`);
      console.log(existingProject);
      if (existingProject.length === 0) {
        await mysql.query(`INSERT INTO project_user (user_id, project_id) VALUES ('${user_id}', '${project_id}')`);
        return 0;
      }
      return -1;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async getProjects(user_id) {
    try {
      const [userProjects] = await mysql.query(`
        SELECT b.id, b.title, b.description
        FROM projects b
        INNER JOIN project_user ub ON b.id = ub.project_id
        WHERE ub.user_id = '${user_id}'
      `);

      const userProjectsWithUsers = await Promise.all(userProjects.map(async (project) => {
        const [users] = await mysql.query(`
          SELECT u.id, u.username
          FROM users u
          INNER JOIN project_user ub ON u.id = ub.user_id
          WHERE ub.project_id = '${project.id}'
        `);
        return { ...project, users };
      }));

      return userProjectsWithUsers;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async getProject(project_id) {
    try {
      const [[project]] = await mysql.query(`SELECT * FROM projects WHERE id='${project_id}'`);

      return project;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async deleteProject(project_id) {
    try {
      await mysql.query(`DELETE FROM projects WHERE id='${project_id}'`);
    } catch (e) {
      throw new Error(e.message);
    }
  }
}

module.exports = new ProjectService();