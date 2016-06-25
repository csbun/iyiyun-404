'use strict';

const iyiyun = require('../');
const fs = require('fs');
const path = require('path');
const ejs = require('silly-ejs');

function iyiyunCacheFactory(cacheTime) {
  let cache;
  let expiredTime = 0;
  return function* iyiyunWithCache() {
    const now = Date.now();
    if (now > expiredTime) {
      cache = yield iyiyun();
      expiredTime = now + cacheTime;
    }
    return cache;
  };
}

exports.renderFactory = function renderFactory(options) {
  const iyiyunData = options.cache > 0 ?
    iyiyunCacheFactory(options.cache) :
    iyiyun;
  if (options.render) {
    return function* render() {
      return options.render(yield iyiyunData());
    };
  }
  const tpl = options.tpl ||
    fs.readFileSync(path.join(__dirname, 'tpl.html'), 'utf8');
  return function* render() {
    return ejs(tpl, yield iyiyunData());
  };
};
