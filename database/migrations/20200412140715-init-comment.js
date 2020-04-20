'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, TEXT, BIGINT } = Sequelize;
    await queryInterface.createTable('comment', {
      id: { type: BIGINT, primaryKey: true, autoIncrement: true },
      content: TEXT,
      userId: BIGINT,
      questionId: BIGINT,
      commentId: BIGINT,
      agreeCount: INTEGER,
      date: BIGINT,
    });
  },
  // 在执行数据库降级时调用的函数，删除 users 表
  down: async queryInterface => {
    await queryInterface.dropTable('comment');
  },
};
