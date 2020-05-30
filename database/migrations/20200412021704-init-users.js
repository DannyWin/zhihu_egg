'use strict';

module.exports = {
    // 在执行数据库升级时调用的函数，创建 users 表
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
    // 在执行数据库降级时调用的函数，删除 users 表
    down: async queryInterface => {
        await queryInterface.dropTable('user');
    },
};
