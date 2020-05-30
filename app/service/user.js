'use strict';

const Service = require('egg').Service;

class UserService extends Service {
    async findOne(obj) {
        const user = await this.ctx.model.User.findOne({ where: obj });
        return user;
    }
}

module.exports = UserService;
