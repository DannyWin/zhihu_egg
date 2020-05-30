'use strict';

const Service = require('egg').Service;

class TopicService extends Service {
    async findAllTopicsLike(obj, transaction) {
        const { app } = this;
        const { name } = obj;
        const topics = await this.ctx.model.Topic.findAll({ where: { name: { [app.Sequelize.Op.like]: `%${name}%` } } }, { transaction });
        return topics;
    }
    async findIdsByNames(names, transaction) {
        const ids = await this.ctx.model.Topic.findAll({ where: { name: names }, attributes: ['id'] }, { transaction });
        return ids;
    }
}

module.exports = TopicService;
