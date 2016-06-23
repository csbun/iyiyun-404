const fs = require('fs');
const url = require('url');
const path = require('path');
const jsdom = require('jsdom');
const jquery = fs.readFileSync(path.join(__dirname, './lib/jquery.min.js'), 'utf-8');

const IYIYUN_URL = 'http://yibo.iyiyun.com/Home/Distribute/ad404';
const IYIYUN_MAP = {
  姓名: 'name',
  性别: 'gender',
  联系方式: 'mobile',
  出生日期: 'birthday',
  失踪时间: 'losttime',
  详情描述: 'description',
};

module.exports = () => {
  const p = new Promise((resolve, reject) => {
    jsdom.env({
      url: IYIYUN_URL,
      src: [jquery],
      done: (err, window) => {
        if (err) {
          reject(err);
        } else {
          const $ = window.$;
          const obj = {};
          obj.img = url.resolve(IYIYUN_URL, $('.main_3_cen_left img').attr('src'));
          $('#main_3_cen_desc div').each((idx, div) => {
            const $div = $(div);
            const $span = $div.find('span');
            const val = ($span.html() || '').replace(/^[：:]?/, '');
            $span.remove();
            const name = $div.html();
            if (IYIYUN_MAP[name]) {
              obj[IYIYUN_MAP[name]] = val;
            } else {
              obj[name] = val;
            }
          });
          resolve(obj);
        }
      },
    });
  });
  return p;
};
