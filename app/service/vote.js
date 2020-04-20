'use strict';

const Service = require('egg').Service;

class VoteService extends Service {
  async findAndCountAll(whereObj, transaction) {
    const ret = await this.ctx.model.Vote.findAndCountAll({ where: whereObj }, { transaction });
    return ret;
  }
}

module.exports = VoteService;
