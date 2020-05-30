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
    down: async queryInterface => {
        await queryInterface.dropTable('topic');
    },
};
