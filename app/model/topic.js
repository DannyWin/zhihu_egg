'use strict';

module.exports = app => {
  const { STRING, BIGINT, TEXT } = app.Sequelize;

  const Topic = app.model.define('topic', {
    id: { type: BIGINT, primaryKey: true, autoIncrement: true },
    pid: BIGINT,
    name: STRING(100),
    introduce: TEXT,
    chinese: TEXT,
    english: TEXT,
    pinyin: TEXT,
    explanation: TEXT,
    literature: TEXT,
    area: TEXT,
    code: TEXT,
  });

  Topic.associate = function() {
    app.model.Topic.belongsToMany(app.model.Question, {
      through: app.model.QuestionTopic,
      foreignKey: 'topicId',
    });
    app.model.Topic.belongsToMany(app.model.User, {
      through: app.model.UserTopic,
      foreignKey: 'topicId',
    });
  };
  return Topic;
};
