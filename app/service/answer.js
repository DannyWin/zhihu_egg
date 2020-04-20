'use strict';

const Service = require('egg').Service;

class AnswerService extends Service {
  async findAll(obj) {
    const { questionId } = obj;
    const answers = await this.ctx.model.Answer.findAll({ where: { questionId } });
    return answers;
  }
}

module.exports = AnswerService;
