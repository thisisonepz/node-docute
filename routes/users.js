var express = require('express');
var router = express.Router();
var fs = require("fs");
// 文件系统，引入user.json的数据;


/* GET users listing. */
router.get('/', function(req, res, next) {
  fs.readFile(__dirname + "/" + "user.json", "utf-8", function (err, data) {
    // __dirname是文件夹的名，我们用fs读取user.json
    console.log(err);
    res.send(data) // 然后把读取的文件通过 res.end()发送给客户端
  })
});

module.exports = router;
