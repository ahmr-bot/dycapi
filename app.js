const express = require("express");
const path = require("path");
const getter = require("./src/get");

const app = express();

// 处理 GET 请求 /yiyan/text
app.get("/yiyan/text", (req, res) => {
  res.send(getter.text());
});

// 处理 GET 请求 /yiyan/json
app.get("/yiyan/json", (req, res) => {
  // 将内容包装为 RESTful API 格式
  const data = {
    status: 200,
    message: "OK",
    data: getter.text(true),
  };
  res.json(data);
});

// 处理 GET 请求 /yiyan/img
app.get("/yiyan/img", async (req, res) => {
  // 返回选中的图片文件
  res.sendFile(path.join(__dirname, "./resources/imgs", await getter.img()));
  // 加入headers使图片直接显示
  res.set("Content-Type", "image/jpeg");
});
// 处理 default 请求
app.get("/", (req, res) => {
  const data = {
    status: 200,
    message: "Welcome to dyc API, version 1x.",
    data: {},
  };
  res.json(data);
});
app.all("*", (req, res) => {
  const data = {
    status: 404,
    message: "Not found.",
    data: {},
  };
  res.status(404);
  res.json(data);
});

// 监听端口 3000
app.listen(3000, () => {
  // 全局加入跨域
  app.all("*", (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    // res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Methods", "GET,OPTIONS");
    res.header("X-Powered-By", " 3.2.1");
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
  });
  console.log("Server is running on port 3000");
});

module.exports = app;
