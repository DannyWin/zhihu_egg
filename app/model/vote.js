'use strict';

module.exports = app => {
  const { INTEGER, BIGINT } = app.Sequelize;

  const Vote = app.model.define('vote', {
    id: { type: BIGINT, primaryKey: true, autoIncrement: true },
    downUp: INTEGER,
    type: INTEGER,
    targetId: BIGINT,
    userId: BIGINT,
    date: BIGINT,
  });

  return Vote;
};
