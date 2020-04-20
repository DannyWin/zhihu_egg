'use strict';

module.exports = app => {
  const { INTEGER, BIGINT } = app.Sequelize;

  const UserTopic = app.model.define('userTopic', {
    id: { type: BIGINT, primaryKey: true, autoIncrement: true },
    userId: BIGINT,
    topicId: BIGINT,
    order: INTEGER,
  });

  return UserTopic;
};
