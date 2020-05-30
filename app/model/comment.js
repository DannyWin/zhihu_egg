'use strict';

module.exports = app => {
    const { BIGINT, INTEGER, TEXT } = app.Sequelize;

    const Comment = app.model.define('comment', {
        id: { type: BIGINT, primaryKey: true, autoIncrement: true },
        content: TEXT,
        userId: BIGINT,
        type: INTEGER, // 0 question  1 answer   2 comment
        targetId: BIGINT, // questionId  answerId commentId
        replyId: BIGINT, // commentId
        replyTo: BIGINT, // userId
        date: BIGINT,
    });

    Comment.associate = function() {
        app.model.Comment.belongsTo(app.model.Question, {
            foreignKey: 'targetId',
        });
        app.model.Comment.belongsTo(app.model.Answer, {
            foreignKey: 'targetId',
        });
        app.model.Comment.hasMany(app.model.Vote, {
            foreignKey: 'targetId',
        });
        app.model.Comment.belongsTo(app.model.User, {
            foreignKey: 'userId',
        });
        app.model.Comment.belongsTo(app.model.User, {
            as: 'replyToUser',
            foreignKey: 'replyTo',
        });
    };
    return Comment;
};


// question直接评论 type=0  targetId=questionId   replayId==null
// question所有评论 type=0  targetId=questionId
// answer直接评论   type=1  targetId=answerId   replayId==null
// answer所有评论   type=1  targetId=answerId
// comment直接评论  type=2  targetId=commentId  replayId==null
// comment所有评论  type=2  targetId=commentId
