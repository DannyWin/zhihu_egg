'use strict';

const Controller = require('egg').Controller;

const createRule = {
  title: 'string',
  content: 'string',
  topics: 'topicsInQuestion',
};

const getAnswerRule = {
  offset: {
    type:'number',
    min:0,
  },
  limit:  {
    type:'number',
    min:0,
  },
  order: 'string',
};

const paramRule = {
  id: 'number',
};

class QuestionController extends Controller {
  async get() {
    const { ctx } = this;
    const id = ctx.params.id;
    const ret = await this.ctx.service.question.findOne(id);
    ctx.body = {
      question: ret,
    };
    ctx.status = 200;
  }
  async getRecommand() {
    const { ctx } = this;
    const date = ctx.query.date;
    const ret = await this.ctx.service.question.findAllRecommand(date);
    ctx.body = {
      questions: ret,
    };
    ctx.status = 200;
  }
  async getAnswer() {
    const { ctx } = this;
    ctx.validate(getAnswerRule, ctx.request.query);
    ctx.validate(paramRule, ctx.params);
    const questionId = ctx.params.id;
    const { offset, limit, order } = ctx.request.query;
    
    const ret = await this.ctx.service.answer.findAndCountAll({ questionId, offset, limit, order });
    ctx.body = {
      count: ret.count,
      answers: ret.rows,
    };
    ctx.status = 200;
  }
  async create() {
    const { ctx, app } = this;
    ctx.validate(createRule, ctx.request.body);
    const { title, content, topics } = ctx.request.body;

    let result = '';
    const transaction = await this.ctx.model.transaction();
    const date = new Date().getTime();

    const uid = app.jwt.decode(ctx.header.authorization.split(' ')[1]).uid;
    const user = await ctx.service.user.findOne({ uid });
    const userId = user.id;
    const question = await ctx.service.question.create({ title, content, userId, date }, transaction);
    const names = topics.map(topic => topic.name);
    const ids = await ctx.service.topic.findIdsByNames(names, transaction);
    const qts = ids.map(topic => { return { questionId: question.id, topicId: topic.id }; });
    result = await ctx.service.questionTopic.bulkCreate(qts, transaction);
    if (result && result.length) {
      await transaction.commit();
      ctx.body = {
        id: question.id,
      };
      ctx.status = 201;
    } else {
      await transaction.rollback();
      ctx.body = {
        code: 'invalid_param',
        message: 'Query Failed',
        errors: [{ code: 'invalid', field: 'topics', message: '主题不存在' }],
      };
      ctx.status = 500;
    }
  }
}

module.exports = QuestionController;
