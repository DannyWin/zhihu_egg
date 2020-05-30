'use strict';

const Controller = require('egg').Controller;

class TopicController extends Controller {
    async get() {
        const { ctx } = this;
        const { keyword } = ctx.request.query;
        let topics = await ctx.service.topic.findAllTopicsLike({ name: keyword });
        topics = topics.map(topic => topic.dataValues);
        if (topics.length) {
            ctx.body = topics;
        } else {
            ctx.body = [];
        }

    }
}

module.exports = TopicController;
