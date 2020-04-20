'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, jwt } = app;
  // app.router.resources('topic', '/topic', app.controller.topic);
  router.post('/login', controller.login.login);
  router.get('/topic', jwt, controller.topic.get);
  router.get('/question/:id', jwt, controller.question.get);
  router.get('/question', jwt, controller.question.getRecommand);
  router.get('/question/:id/answer', jwt, controller.question.getAnswer);
  router.post('/question', jwt, controller.question.create);
};
