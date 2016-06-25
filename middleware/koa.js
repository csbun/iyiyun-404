'use strict';

const util = require('./util');

module.exports = function iyiyunMiddlewareFactory(options) {
  const render = util.renderFactory(options);

  return function* iyiyunMiddleware(next) {
    yield next;
    if (this.status === 404) {
      this.body = yield render();
    }
  };
};
