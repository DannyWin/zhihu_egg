'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { STRING, TEXT, BIGINT } = Sequelize;
    await queryInterface.createTable('question', {
      id: { type: BIGINT, primaryKey: true, autoIncrement: true },
      title: STRING(100),
      content: TEXT,
      userId: BIGINT,
      date: BIGINT,
    });
  },
  down: async queryInterface => {
    await queryInterface.dropTable('question');
  },
};
