'use strict';

module.exports = app => {
    const { INTEGER, BIGINT } = app.Sequelize;

    const Vote = app.model.define('vote', {
        id: { type: BIGINT, primaryKey: true, autoIncrement: true },
        downUp: INTEGER, // -1 down  1 up  0 cancel
        type: INTEGER, // 0 Answer  1 Comment
        targetId: BIGINT, // answerId or CommentId
        userId: BIGINT,
        date: BIGINT,
    });

    return Vote;
};
