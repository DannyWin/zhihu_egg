'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { TEXT, BIGINT } = Sequelize;
    await queryInterface.createTable('answer', {
      id: { type: BIGINT, primaryKey: true, autoIncrement: true },
      content: TEXT,
      userId: BIGINT,
      questionId: BIGINT,
      date: BIGINT,
    });
  },
  down: async queryInterface => {
    await queryInterface.dropTable('answer');
  },
};
