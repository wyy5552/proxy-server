/*
 * @Author: your name
 * @Date: 2021-11-12 00:25:37
 * @LastEditTime: 2021-11-12 23:53:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /node/server.js
 */
// server.js 

// 引入相关模块
var http = require('http');
var url = require('url');
var path = require('path');
var readStaticFile = require("./modules/readStaticFile");

// 搭建 HTTP 服务器
var server = http.createServer(function(req, res) {
// 解析请求 URL
    var urlObj = url.parse(req.url, true);
    // 获取请求 URL 的路径
    var urlPathname = urlObj.pathname;
    // 获取请求 URL 的查询字符串解析成的对象
    var queryObj = urlObj.query;
    switch(urlPathname){
      case "/":
        case "":
              readStaticFile(res, path.join(__dirname,'./public/index.html'));
              break;
              default:{
                readStaticFile(res,path.join(__dirname,'./public/',urlPathname))
              }
    }
});

// 在 3000 端口监听请求
server.listen(3000, function() {
  console.log("服务器运行中.");
  console.log("正在监听 3000 端口:")
})