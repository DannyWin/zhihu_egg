/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */

module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {
    security: {
      csrf: {
        enable: false,
      },
    },
    bodyParser: {
      jsonLimit: '100mb',
      formLimit: '100mb',
    },
    cors: {
      origin: '*',
      allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
    },
    jwt: { // 令牌配置项
      secret: '123456',
    },
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_abcdefgh';
  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    database: 'zhihu',
    username: 'admin',
    password: 'admin',
    define: {
      timestamps: false,
      freezeTableName: true,
    },
  };
  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};

