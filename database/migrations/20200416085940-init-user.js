'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING, BIGINT } = Sequelize;
    await queryInterface.createTable('user', {
      id: { type: BIGINT, primaryKey: true, autoIncrement: true },
      uid: STRING(30),
      pwd: STRING(30),
      name: STRING(30),
      age: INTEGER,
    });
  },
  down: async queryInterface => {
    await queryInterface.dropTable('user');
  },
};
