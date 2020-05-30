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
        validate: { // 配置参数校验器，基于parameter
            convert: true, // 对参数可以使用convertType规则进行类型转换
            // validateRoot: false,   // 限制被验证值必须是一个对象。
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

