'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const { INTEGER, BIGINT } = Sequelize;
        await queryInterface.createTable('questionTopic', {
            id: { type: BIGINT, primaryKey: true, autoIncrement: true },
            questionId: BIGINT,
            topicId: BIGINT,
            order: INTEGER,
        });
    },
    down: async queryInterface => {
        await queryInterface.dropTable('questionTopic');
    },
};
