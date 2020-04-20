'use strict';

const Service = require('egg').Service;

class QuestionService extends Service {
  async findOne(id) {
    const ret = await this.ctx.model.Question.findOne({ where: { id }, include: [{ model: this.ctx.model.Topic }, { model: this.ctx.model.Answer, limit: 3 }] });
    return ret;
  }
  async findAllRecommand(date) {
    const { app } = this;
    const ret = await this.ctx.model.Question.findAll({ where: { date: { [app.Sequelize.Op.gt]: date } }, limit: 16, order: [['date', 'DESC']], include: [{ model: this.ctx.model.User, attributes: ['uid', 'name'] }, { model: this.ctx.model.Comment, where: { type: 0 }, required: false, include: [{ model: this.ctx.model.User, attributes: ['uid', 'name'] }, { model: this.ctx.model.Vote, attributes: ['id'] }] }] });
    return ret;
  }
  async create(question, transaction) {
    const ret = await this.ctx.model.Question.create(question, { transaction });
    return ret;
  }
}

module.exports = QuestionService;
