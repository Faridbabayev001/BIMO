const users = require('@routes/users.route');

module.exports = (router) => {
  users(router);
  return router;
};