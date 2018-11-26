const request = require('request');
var cheerio = require('cheerio');
var path = require('path');
var fs = require('fs');
var async = require('async');
var mkdirp = require('mkdirp');
// 需要爬的网址
function fetchUrl(url) {
    var options = {
        url: "http://www.zhainanmao.com/6683.html",
        headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.99 Safari/537.36',
            'Connection': 'keep-alive'
        }
    };
    console.log('打开新世界大门：' + options.url);
    request(options, function(error, response, body) {
        if (error) console.log(error);
        else console.log('成功打开新世界大门' + options.url);
        if (!error && response.statusCode == 200) {
            // console.log(body);
            acquireData(url, body);
        }
    })
}

var url = "http://www.zhainanmao.com/5197.html";
fetchUrl(url);

function acquireData(url, data) {
    var $ = cheerio.load(data);

    var meizi = $('.single-text>p img').toArray();
    console.log( $('.single-text>p img'));
    // console.log(meizi);
    var imgsrc = meizi[0].namespace;

    for (var i = 1; i < meizi.length; i++) {
        var imgsrc = meizi[i].attribs.src;
        // console.log(imgsrc);
        var filename = parseUrlForFileName(imgsrc); //生成文件名
        downloadImg(imgsrc, filename, './mei' , function() {
            // console.log(filename + ' done');
        });
    }
}

function parseUrlForFileName(address) {
    var filename = path.basename(address);
    return filename;
}

var downloadImg = function(uri, filename, dir, callback) {
    request({ uri: uri, encoding: 'binary' }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            if (!body) console.log("(╥╯^╰╥)哎呀没有内容。。。")
            fs.writeFile(dir + '/' + filename, body, 'binary', function(err) {
                if (err) { console.log(err); }
                console.log('小黄图下载中' + dir + '/' + filename + ' done');
            });
        }
    });
};