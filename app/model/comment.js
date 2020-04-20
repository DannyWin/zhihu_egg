'use strict';

module.exports = app => {
  const { BIGINT, INTEGER, TEXT } = app.Sequelize;

  const Comment = app.model.define('comment', {
    id: { type: BIGINT, primaryKey: true, autoIncrement: true },
    content: TEXT,
    userId: BIGINT,
    type: INTEGER,
    targetId: BIGINT,
    replyId: BIGINT,
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
  };
  return Comment;
};
