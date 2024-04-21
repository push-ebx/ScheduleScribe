const projectService = require('../services/project-service');

class ProjectController {
  async createProject(req, res, next) {
    try {
      const { title, description } = req.body;
      const id = await projectService.createProject(title, description, req.user_id);
      return res.send({ status: 'ok', success: true, message: 'Проект успешно создан!', data: { id } });
    } catch (e) {
      next(e);
    }
  }

  async addProject(req, res, next) {
    try {
      const { id } = req.body;
      const result = await projectService.addProject(req.user_id, id);
      if (!result) return res.send({ status: 'ok', success: true, message: 'Проект успешно добавлен!' });
      else return res.send({ status: 'ok', success: false, message: 'Проект уже был добавлен!' });
    } catch (e) {
      next(e);
    }
  }

  async getProjects(req, res, next) {
    try {
      const projects = await projectService.getProjects(req.user_id);
      return res.send({ status: 'ok', success: true, data: projects });
    } catch (e) {
      next(e);
    }
  }

  async getProject(req, res, next) {
    try {
      const { project_id } = req.query;
      const project = await projectService.getProject(project_id);
      if (project) return res.send({ status: 'ok', success: true, data: project });
      else return res.send({ status: 'ok', success: false, message: "Проект с таким ID не найден" });
    } catch (e) {
      next(e);
    }
  }

  async deleteProject(req, res, next) {
    const { id } = req.query;

    if (!id) {
      return res.status(400).send({ status: 'error', success: false, message: 'Необходим идентификатор проекта' });
    }

    try {
      await projectService.deleteProject(id);
      return res.send({ status: 'ok', success: true, message: 'Проект успешно удален' });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new ProjectController();