'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, TEXT, STRING, BIGINT } = Sequelize;
    await queryInterface.createTable('user', {
      id: { type: BIGINT, primaryKey: true, autoIncrement: true },
      uid: STRING(30),
      pwd: STRING(30),
      name: STRING(30),
      avatar: TEXT,
      age: INTEGER,
    });
  },
  down: async queryInterface => {
    await queryInterface.dropTable('user');
  },
};
