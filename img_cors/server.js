/*
 * @Author: your name
 * @Date: 2021-11-12 00:25:37
 * @LastEditTime: 2021-11-24 22:20:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /node/server.js
 */
// server.js 

// 引入相关模块
var http = require('http');
var url = require('url');
var path = require('path');
var readStaticFile = require('./modules/readStaticFile');

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
                // res.setHeader("Access-Control-Allow-Origin","http://localhost:3001");
                // res.setHeader('Access-Control-Allow-Credentials',true);
                readStaticFile(res,path.join(__dirname,'./public/',urlPathname))
              }
    }
    // // 路由
    // switch (urlPathname) {
    //     // 响应 login 页面
    //     case "/":
    //     case "":
    //         // 我用了静态服务器那篇的模块, 不了解的地方可以去那篇参考
    //         readStaticFile(res, path.join(__dirname,'./public/login.html'));
    //         break;
    //     // 响应查询对象的 JSON 形式到浏览器 
    //     case "/haha":
    //         res.writeHead(200, { "Content-Type": "text/plain" });
    //         res.write(JSON.stringify(queryObj));
    //         res.end();
    //         break;
    //     // 错误处理
    //     default:
    //         readStaticFile(res, "./404.html");
    // }
});

// 在 3000 端口监听请求
server.listen(80, function() {
  console.log("服务器运行中.");
  console.log("正在监听 80 端口:")
})