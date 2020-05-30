'use strict';

const Service = require('egg').Service;

class CommentService extends Service {
    async findByPk(id) {
        const ret = await this.ctx.model.Question.findByPk(id);
        return ret;
    }
}

module.exports = CommentService;
