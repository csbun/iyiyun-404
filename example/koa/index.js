'use strict';

const koa = require('koa');
const iyiyun404middleware = require('../../middleware/koa');
const app = koa();

app.use(iyiyun404middleware({
  cache: 0,
}));


app.use(function* home() {
  if (this.path === '/home') {
    this.body = `<html><body>
    <h1>HOME</h1>
    <p>this is the home page.</p>
    </body></html>`;
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`start: http://127.0.0.1:${PORT}`);
});
