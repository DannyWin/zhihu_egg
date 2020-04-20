'use strict';

module.exports = app => {
  const { STRING, INTEGER, BIGINT } = app.Sequelize;

  const User = app.model.define('user', {
    id: { type: BIGINT, primaryKey: true, autoIncrement: true },
    uid: STRING(30),
    pwd: STRING(30),
    name: STRING(30),
    age: INTEGER,
  });
  User.associate = function() {
    app.model.User.hasMany(app.model.Question, {
      foreignKey: 'userId',
    });
    app.model.User.hasMany(app.model.Question, {
      foreignKey: 'userId',
    });
    app.model.User.belongsToMany(app.model.Topic, {
      through: app.model.UserTopic,
      foreignKey: 'userId',
    });
  };
  return User;
};
