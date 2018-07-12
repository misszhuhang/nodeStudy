'use strict';
var http = require("http");
var url = require('url');
var fs = require('fs');
var path = require('path');
var root = path.resolve(process.argv[2] || '.');
console.log('Static root dir: ' + root);
// http.createServer(function (request, response) {
//     // 发送 HTTP 头部 
//     // HTTP 状态值: 200 : OK
//     console.log(request.method+":"+request.url);
//     // 内容类型: text/plain
//     response.writeHead(200, { 'Content-Type': 'text/html' });
//     // 发送响应数据 "Hello World"
//     response.end('Hello World,danbao\n');
// }).listen(8888);
var server = http.createServer(function (request, response) {
    console.log(url.parse(request.url))
    var pathname = url.parse(request.url).pathname; 
    var filepath = path.join(root, pathname); 
    console.log(pathname);
    console.log(filepath);
    if (pathname === '/') {
        fs.createReadStream(path.join(root, './index.html')).pipe(response);
    } else {
        fs.stat(filepath, function (err, stats) {
            if (!err && stats.isFile()) {
                console.log('200 ' + request.url);
                response.writeHead(200);
                fs.createReadStream(filepath).pipe(response);
            } else if (!err && stats.isDirectory()){
                console.log("directory");
                fs.createReadStream(path.join(root, './index.html')).pipe(response);
            }else {
                console.log('404 ' + request.url);
                response.writeHead(404);
                response.end('404 Not Found');
            }
        });
    }
});
server.listen(8888);
// 终端打印如下信息
console.log('Server is running at http://127.0.0.1:8888/');
// console.log('Hello, world.');
// console.log(url.format({
//     protocol: 'http',
//     hostname: 'localhost',
//     pathname: '/static/js',
//     query: {
//         name: 'Nodejs',
//         version: 'v 1.0'`
//     }
// }));
// console.log(url.parse('http://user:pass@host.com:8080/path/to/file?query=string#hash'));
function a(name) {
    console.log(name);
}
module.exports = a;