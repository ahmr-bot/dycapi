const fs = require("fs");
const path = require("path");

class Getter {
  static text(json = false) {
    // 读取 yulu.txt 文件并将每行内容存储到一个数组中
    const yuluData = fs
      .readFileSync(path.join(__dirname, "../resources/yulu.txt"), "utf8")
      .split("\n");
    // 从 yuluData 数组中随机选择一行
    let randomLine = yuluData[Math.floor(Math.random() * yuluData.length)];
    // 去除换行符
    randomLine = randomLine.substring(0, randomLine.length - 1);
    if (!json) return randomLine;
    const json_data = {
      text: randomLine,
    };
    return json_data;
  }

  static img() {
    return new Promise((resolve, reject) => {
      // 获取 imgs 文件夹下的所有文件
      fs.readdir(path.join(__dirname, "../resources/imgs"), (err, files) => {
        if (err) {
          console.error(err);
          return res.status(500).send("Internal Server Error");
        }
        // 从文件列表中随机选择一张图片文件
        const randomFile = files[Math.floor(Math.random() * files.length)];
        resolve(randomFile);
      });
    });
  }
}

module.exports = Getter;
// export default Getter;
