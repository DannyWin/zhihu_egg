'use strict';

const Service = require('egg').Service;

class QuestionTopicService extends Service {
  async create(questionTopic,transaction) {
    const ret = await this.ctx.model.QuestionTopic.create(questionTopic, { transaction });
    return ret;
  }
  async bulkCreate(questionTopics,transaction) {
    const ret = await this.ctx.model.QuestionTopic.bulkCreate(questionTopics, { transaction });
    return ret;
  }
}

module.exports = QuestionTopicService;
