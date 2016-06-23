# iyiyun-404

从 [益云](http://yibo.iyiyun.com/Home/Index/web404) 抓取失踪儿童信息

## 安装

```
npm i iyiyun-404 --save
```

## 使用

```javascript
const iyiyun404 = require('iyiyun-404');
iyiyun404() // Preomise
  .then(data => {
    console.log(data);
  });
```

## 声明

所有数据均从 [益云](http://yibo.iyiyun.com/Home/Index/web404) 官方获取。
