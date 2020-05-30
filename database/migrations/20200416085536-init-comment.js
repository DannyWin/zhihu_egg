'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const { TEXT, INTEGER, BIGINT } = Sequelize;
        await queryInterface.createTable('comment', {
            id: { type: BIGINT, primaryKey: true, autoIncrement: true },
            content: TEXT,
            userId: BIGINT,
            type: INTEGER,
            targetId: BIGINT,
            replyId: BIGINT,
            date: BIGINT,
        });
    },
    down: async queryInterface => {
        await queryInterface.dropTable('comment');
    },
};
