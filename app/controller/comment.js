'use strict';

const Controller = require('egg').Controller;


class CommentController extends Controller {
    async get() {
        const { ctx } = this;
        const id = ctx.params.id;
        const ret = await this.ctx.service.comment.findByPk(id);
        return ret;
    }
}

module.exports = CommentController;
