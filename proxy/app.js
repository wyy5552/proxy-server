const http = require('http');
const httpProxy = require('http-proxy');
//创建一个代理服务
const proxy = httpProxy.createProxyServer();
 
//虚拟主机
const hosts = {
    'localhost': 'http://localhost:80',
};
//创建http服务器并监听80端口
let server = http.createServer(function (req, res) {
    //获取主机名
    let host = req.headers['host'];
    console.log(host);
    host = host.split(':')[0];
    //根据主机名，找到要代理的服务
    let target = hosts[host];
    if (target) {
        proxy.web(req, res, {
            target: target
        });
        proxy.on('error', function (err) {
            console.log(err);
        });
    } else {
        proxy.web(req, res, {
            target: "http://localhost:3001"
        });
    }
});
server.listen(9998, '0.0.0.0');