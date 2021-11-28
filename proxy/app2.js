/*
 * @Author: your name
 * @Date: 2021-11-24 21:43:22
 * @LastEditTime: 2021-11-28 15:15:08
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /github/serve/proxy/app2.ts
 */
const http = require("http");
const server = http.createServer();
server.on('request',(req,res)=>{
    // 使用es6的扩展运算符过滤请求头,提出host connection
    var { connection, host, ...originHeaders } = req.headers;
    if(req.url.indexOf(".jpg")>-1){
        console.log(req.url);
    }
    // 通过req的data事件和end事件接收客户端发送的数据
    // 并用Buffer.concat处理一下
    let postbody = [];
    req.on("data", chunk => {
        postbody.push(chunk);
    })
    req.on('end', () => {
            console.log("德玛西亚",req.url);
            http.get(req.url, (response) => {
                //data 存储图片数据，是二进制流 
                var data = [];
                // 一定要设置encode，否则即使在pic/downImg/中有1.jpg,也是无法显示的
                response.setEncoding("binary")
                // 当数据到达时会触发data事件
                response.on('data', function (chunk) {
                    data += chunk;
                });
                // 当数据接收完毕之后，会触发end事件
                response.on("end", function () {
                    res.setHeader('Content-Type', "image/jpeg");
                    res.setHeader("Access-Control-Allow-Origin","*");
                    res.write(data,"binary");
                    res.end();
                });
                
                }).on("error", function () {
                console.log('读取错误')
                });
            
        // 将接收到的客户端请求数据发送到目标服务器;
    })
})
server.listen(3000,()=>{
    console.log("running");
})