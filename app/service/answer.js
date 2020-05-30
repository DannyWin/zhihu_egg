'use strict';

const Service = require('egg').Service;

class AnswerService extends Service {
    async findAll(whereObj) {
        const { questionId, limit, offset, order } = whereObj;
        let orderActual;
        if (order === 'normal') {
            orderActual = [['date', 'DESC']];
        }
        const answers = await this.ctx.model.Answer.findAll({ where: { questionId }, limit, offset, order: orderActual });
        return answers;
    }
    async findAndCountAll(whereObj) {
        const { questionId, limit, offset, order } = whereObj;
        let orderActual;
        if (order === 'normal') {
            orderActual = [['date', 'DESC']];
        }
        const ret = await this.ctx.model.Answer.findAndCountAll({ include: [{ model: this.ctx.model.User, attributes: ['id', 'name', 'avatar'] }, { model: this.ctx.model.Comment, where: { type: 1 }, include: [{ model: this.ctx.model.User, attributes: ['id', 'name', 'avatar'] }, { model: this.ctx.model.User, as: 'replyToUser', attributes: ['uid', 'name', 'avatar'] }] }], where: { questionId }, limit, offset, order: orderActual });
        return ret;
    }
}

module.exports = AnswerService;
