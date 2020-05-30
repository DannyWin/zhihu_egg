'use strict';

module.exports = app => {
    const { BIGINT, TEXT } = app.Sequelize;

    const Answer = app.model.define('answer', {
        id: { type: BIGINT, primaryKey: true, autoIncrement: true },
        content: TEXT,
        userId: BIGINT,
        questionId: BIGINT,
        date: BIGINT,
    });
    Answer.associate = function() {
        app.model.Answer.hasMany(app.model.Comment, {
            foreignKey: 'targetId',
        });
        app.model.Answer.hasMany(app.model.Vote, {
            foreignKey: 'targetId',
        });
        app.model.Answer.belongsTo(app.model.User, {
            foreignKey: 'userId',
        });
    };
    return Answer;
};
