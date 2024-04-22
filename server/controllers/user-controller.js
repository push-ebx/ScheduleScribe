class UserController {
  async getUser(req, res, next) {
    try {
      console.log(req.user_id)
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
}

module.exports = new UserController();