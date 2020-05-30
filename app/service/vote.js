'use strict';

const Service = require('egg').Service;

class VoteService extends Service {
    async create(vote) {
        const ret = await this.ctx.model.Vote.create(vote);
        return ret;
    }
    async count(whereObj) {
        const ret = await this.ctx.model.Vote.count({ where: whereObj });
        return ret;
    }
    async delete(whereObj) {
        const delCount = await this.ctx.model.Vote.destroy({ where: whereObj, force: true });
        return delCount;
    }
    async findAndCountAll(whereObj, transaction) {
        const ret = await this.ctx.model.Vote.findAndCountAll({ where: whereObj }, { transaction });
        return ret;
    }
}

module.exports = VoteService;
