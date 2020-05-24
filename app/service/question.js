'use strict';

const Service = require('egg').Service;

class QuestionService extends Service {
  async findOne(id) {
    const ret = await this.ctx.model.Question.findOne({ where: { id }, include: [{ model: this.ctx.model.Topic }, { model: this.ctx.model.Answer, limit: 3 }] });
    return ret;
  }
  async findAllRecommand(date) {
    const { app } = this;
    let questions = await this.ctx.model.Question.findAll({
      where: { date: { [app.Sequelize.Op.gt]: date } },
      limit: 16,
      order: [['date', 'DESC']],
      // attributes: { include: [[app.Sequelize.fn('COUNT', app.Sequelize.col('price')), 'voteCount']] },
      // group: 'targetId',
      // having: ['COUNT(?)>?', 'targetId', 1],

      include: [{ model: this.ctx.model.User, attributes: ['uid', 'name'] },
      // { model: this.ctx.model.Comment, where: { type: 0 }, required: false, include: [{ model: this.ctx.model.User, attributes: ['uid', 'name'] }] },
      { model: this.ctx.model.Answer, required: false, include: [{ model: this.ctx.model.Vote, where: { downUp: 1, type: 1 }, required: false, attributes: ['id'] }, { model: this.ctx.model.Comment, attributes: ['id'], where: { type: 1 }, required: false }] }, // attributes: [[ app.Sequelize.fn('COUNT', app.Sequelize.col('*')), 'voteCount' ]],group:'targetId'
      //{ model: this.ctx.model.Comment, where: { type: 0 }, required: false, include: [{ model: this.ctx.model.Vote, where: { downUp: 1, type: 0 }, required: false }] }, // attributes: [[ app.Sequelize.fn('COUNT', app.Sequelize.col('*')), 'voteCount' ]],group:'targetId'
      ],

    });
    questions = JSON.parse(JSON.stringify(questions));
    console.log(questions[0].answers[0].votes);
    questions.forEach(question => {
      let topAnswer = { voteCount: 0 };
      if (question.answers) {
        question.answers.forEach(answer => {
          if (answer.votes) {
            answer.voteCount = answer.votes.length;
            delete answer.votes;
          } else {
            answer.voteCount = 0;
          }
          if (answer.voteCount > topAnswer.voteCount) {
            topAnswer.voteCount = answer.voteCount;
            topAnswer = Object.assign(answer, { voteCount: answer.voteCount });
          }
        });
        question.topAnswer = topAnswer;
        //delete question.answers;
        if (question.topAnswer.comments) {
          question.topAnswer.commentCount = question.topAnswer.comments.length;
          delete question.topAnswer.comments;
        } else {
          question.topAnswer.commentCount = 0;
        }

      }
    });
    return questions;
  }
  async create(question, transaction) {
    const ret = await this.ctx.model.Question.create(question, { transaction });
    return ret;
  }
}

module.exports = QuestionService;
