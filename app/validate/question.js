'use strict';

module.exports = app => {

    const { validator } = app;

    // 校验用户名是否正确
    validator.addRule('topicsInQuestion', (rule, value) => {
        if (!value) {
            return '主题必须存在';
        }
        if (!Array.isArray(value)) {
            return '主题必须为数组';
        }
        if (!value.length) {
            return '主题不能为空';
        }
    });
};
