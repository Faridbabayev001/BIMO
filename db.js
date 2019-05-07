var mongoose = require('mongoose');
const config = require('@root/config');

module.exports = function () {
  mongoose.connect(config.connection_url, { useNewUrlParser: true });
};