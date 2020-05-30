'use strict';

const Controller = require('egg').Controller;

class AnswerController extends Controller {
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
    async vote() {
        const { ctx, app } = this;
        const { type, targetId, downUp } = ctx.request.body;
        const uid = app.jwt.decode(ctx.header.authorization.split(' ')[1]).uid;
        const user = await ctx.service.user.findOne({ uid });
        const userId = user.id;
        const date = new Date().getTime();
        const ret = await ctx.service.vote.create({
            type,
            targetId,
            downUp,
            userId,
            date,
        });
        if (ret.get({ plain: true }).downUp) {
            const voteCount = await ctx.service.vote.count({
                type,
                targetId,
                downUp: 1,
            });
            ctx.body = {
                voteCount,
            };
        } else {
            ctx.body = {
                msg: 'error',
            };
        }
    }
}

module.exports = AnswerController;
