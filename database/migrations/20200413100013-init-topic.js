'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { STRING, TEXT, BIGINT } = Sequelize;
    await queryInterface.createTable('topic', {
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
  },
  // 在执行数据库降级时调用的函数，删除 users 表
  down: async queryInterface => {
    await queryInterface.dropTable('topic');
  },
};
