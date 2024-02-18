const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

// 读取 yulu.txt 文件并将每行内容存储到一个数组中
const yuluData = fs.readFileSync(path.join(__dirname, 'yulu.txt'), 'utf8').split('\n');

// 处理 GET 请求 /yiyan/txt
app.get('/yiyan/txt', (req, res) => {
  // 从 yuluData 数组中随机选择一行
  const randomLine = yuluData[Math.floor(Math.random() * yuluData.length)];
  res.send(randomLine);
});

// 处理 GET 请求 /yiyan/json
app.get('/yiyan/json', (req, res) => {
  // 从 yuluData 数组中随机选择一行
  const randomLine = yuluData[Math.floor(Math.random() * yuluData.length)];
  // 将内容包装为 RESTful API 格式
  const data = { data: randomLine };
  res.json(data);
});

// 处理 GET 请求 /yiyan/img
app.get('/yiyan/img', (req, res) => {
  // 获取 imgs 文件夹下的所有文件
  fs.readdir(path.join(__dirname, 'imgs'), (err, files) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }
    // 从文件列表中随机选择一张图片文件
    const randomFile = files[Math.floor(Math.random() * files.length)];
    // 返回选中的图片文件
    res.sendFile(path.join(__dirname, 'imgs', randomFile));
    // 加入headers使图片直接显示
    res.set('Content-Type', 'image/jpeg');
  });
});

// 监听端口 3000
app.listen(3000, () => {
    // 全局加入跨域
    app.all('*', function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "X-Requested-With");
      res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
      res.header("X-Powered-By",' 3.2.1')
      res.header("Content-Type", "application/json;charset=utf-8");
      next();
    });
  console.log('Server is running on port 3000');
});