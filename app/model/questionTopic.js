'use strict';

module.exports = app => {
    const { INTEGER, BIGINT } = app.Sequelize;

    const QuestionTopic = app.model.define('questionTopic', {
        id: { type: BIGINT, primaryKey: true, autoIncrement: true },
        questionId: BIGINT,
        topicId: BIGINT,
        order: INTEGER,
    });

    return QuestionTopic;
};
