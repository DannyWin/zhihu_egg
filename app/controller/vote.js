'use strict';

const Controller = require('egg').Controller;

const createRule = {
    type: 'voteType',
    downUp: 'voteDownUp',
    targetId: 'number',
};

class VoteController extends Controller {
    async vote() {
        const { ctx, app } = this;
        ctx.validate(createRule, ctx.request.body);
        const { type, downUp, targetId } = ctx.request.body;
        const uid = app.jwt.decode(ctx.header.authorization.split(' ')[1]).uid;
        const user = await ctx.service.user.findOne({ uid });
        const userId = user.id;
        const date = new Date().getTime();
        if (downUp !== 0) {
            await ctx.service.vote.delete({ type, targetId, downUp: -1 * downUp, userId });
            await ctx.service.vote.create({ type, targetId, downUp, userId, date });
        } else {
            await ctx.service.vote.delete({ type, targetId, userId });
        }
        const voteCount = await ctx.service.vote.count({ type, targetId, downUp: 1 });
        ctx.body = {
            voteCount,
        };


    }
    async like() {
        const { ctx, app } = this;
        ctx.validate(createRule, ctx.request.body);
        const { type, downUp, targetId } = ctx.request.body;
        const uid = app.jwt.decode(ctx.header.authorization.split(' ')[1]).uid;
        const user = await ctx.service.user.findOne({ uid });
        const userId = user.id;
        const date = new Date().getTime();
        if (downUp !== 0) {
            await ctx.service.vote.delete({ type, targetId, downUp: -1 * downUp, userId });
            await ctx.service.vote.create({ type, targetId, downUp, userId, date });
        } else {
            await ctx.service.vote.delete({ type, targetId, userId });
        }
        const voteCount = await ctx.service.vote.count({ type, targetId, downUp: 1 });
        ctx.body = {
            voteCount,
        };


    }
}

module.exports = VoteController;
