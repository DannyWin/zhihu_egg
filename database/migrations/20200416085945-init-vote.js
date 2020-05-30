'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const { INTEGER, BIGINT } = Sequelize;
        await queryInterface.createTable('vote', {
            id: { type: BIGINT, primaryKey: true, autoIncrement: true },
            downUp: INTEGER,
            type: INTEGER,
            targetId: BIGINT,
            userId: BIGINT,
            date: BIGINT,
        });
    },
    down: async queryInterface => {
        await queryInterface.dropTable('vote');
    },
};
