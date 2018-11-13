# Chrome_extension
Learning some from chrome extension

模块化标准:
CommonJS, AMD, CMD, ES6

非阻塞代码实例:
    var fs = require("fs");

    fs.readFile('input.txt', function (err, data) {
        if (err) return console.error(err);
        console.log(data.toString());
    });

    console.log("程序执行结束!");

阻塞代码实例
    var fs = require("fs");

    var data = fs.readFileSync('input.txt');

    console.log(data.toString());
    console.log("程序执行结束!");

Node.js 几乎每一个 API 都是支持回调函数的


读取数据

写入流

管道流

链式流