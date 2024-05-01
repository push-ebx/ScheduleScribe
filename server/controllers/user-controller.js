const userService = require('../services/user-service');

class UserController {
  async getUser(req, res, next) {
    try {
      const [[user]] = await mysql.query(`SELECT * from users WHERE id='${req.user_id}'`);

      if (user) {
        return res.send({
          status: 'ok',
          success: true,
          data: user
        });
      } else {
        return res.send({
          status: 'ok',
          success: false,
          message: 'Пользователь не найден'
        });
      }
    } catch (e) {
      next(e);
    }
  }

  async uploadImage(req, res, next) {
    try {
      const { avatar } = req.files;

      // If no image submitted, exit
      if (!image) return res.sendStatus(400);

      // Move the uploaded image to our public folder
      image.mv(__dirname + '/public/' + image.name);

      res.sendStatus(200);
    } catch (e) {
      next(e);
    }
  }

  async statistics(req, res, next) {
    try {
      const statistics = await userService.statistics(req.user_id, req.query.date);
      return res.send({status: 'ok', success: true, data: statistics});
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new UserController();