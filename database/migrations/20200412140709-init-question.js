'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const { INTEGER, STRING, TEXT, BIGINT } = Sequelize;
        await queryInterface.createTable('question', {
            id: { type: BIGINT, primaryKey: true, autoIncrement: true },
            title: STRING(100),
            content: TEXT,
            userId: BIGINT,
            agreeCount: INTEGER,
            date: BIGINT,
        });
    },
    // 在执行数据库降级时调用的函数，删除 users 表
    down: async queryInterface => {
        await queryInterface.dropTable('question');
    },
};
