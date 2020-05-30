'use strict';

module.exports = app => {
    const { STRING, BIGINT, TEXT } = app.Sequelize;

    const Question = app.model.define('question', {
        id: { type: BIGINT, primaryKey: true, autoIncrement: true },
        title: STRING(100),
        content: TEXT,
        userId: BIGINT,
        date: BIGINT,
    });

    Question.associate = function() {
        app.model.Question.belongsToMany(app.model.Topic, {
            through: app.model.QuestionTopic,
            foreignKey: 'questionId',
        });
        app.model.Question.belongsTo(app.model.User, {
            foreignKey: 'userId',
        });
        app.model.Question.hasMany(app.model.Answer, {
            foreignKey: 'questionId',
        });
        app.model.Question.hasMany(app.model.Comment, {
            foreignKey: 'targetId',
        });
    };
    return Question;
};
