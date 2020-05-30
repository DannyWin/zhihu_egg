'use strict';

module.exports = app => {

    const { validator } = app;

    // 校验用户名是否正确
    validator.addRule('voteType', (rule, value) => {
        if (typeof value !== 'number') {
            return '投票类型必须为有效代码';
        }
        if (value !== 0 && value !== 1) {
            return '投票类型错误';
        }
    });
    validator.addRule('voteDownUp', (rule, value) => {
        if (typeof value !== 'number') {
            return '投票方向必须为有效代码';
        }
        if (value !== 0 && value !== 1 && value !== -1) {
            return '投票方向错误';
        }
    });
};
