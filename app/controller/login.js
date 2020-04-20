'use strict';

const Controller = require('egg').Controller;

class LoginController extends Controller {
  async login() {
    const { ctx, app } = this;
    const { uid, pwd } = ctx.request.body;
    console.log(ctx.request.body);
    const user = await ctx.service.user.findOne({ uid, pwd });
    if (user) {
      const token = app.jwt.sign({
        uid,
      }, app.config.jwt.secret, { expiresIn: 86400000 });
      ctx.body = { token };
      // ctx.body = user;
    } else {
      ctx.body = '用户名或密码错误';
    }

  }
}

module.exports = LoginController;
