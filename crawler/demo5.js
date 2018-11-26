const request = require('request');
var cheerio = require('cheerio');
var path = require('path');
var fs = require('fs');
var async = require('async');
var mkdirp = require('mkdirp');

// 爬取半次元网站的cosplay照片
//   https://bcy.net/coser/toppost100
const url = 'https://bcy.net/coser/discover';
// 第一步 从 https://bcy.net/coser/toppost100 获取到a标签的href

var src=[];
// //获取页面的HTML
function getHtml(callback){
    var options = {
        url: url,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.108 Safari/537.36',
            'Connection': 'keep-alive'
        }
    }
    request(options, function(error, response, body) {
        if (error) console.log(error);
        if (!error && response.statusCode == 200) {
            callback(null,body)
        }
    });
}

// 提取封面的a标签
function getHref(body,callback) {
    const $ = cheerio.load(body);
    var href = $('.disc_a ');
    var page=[];
    console.log('共获得' + href.length + 'coser');
    for (var i = 0; i < 100; i++) {
        var pageUrl = href.eq(i).attr('href');
        page.push(pageUrl);
    }
    callback(null,page)
}

//获得详情页HTML
function getDetail(page,callback) {
    var options = {
        url: page,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.108 Safari/537.36',
            'Connection': 'keep-alive'
        }
    }
    request(options, function(error, response, body) {
        if (error) console.log(error);
        if (!error && response.statusCode == 200) {
            const $ = cheerio.load(body);
            var href = $('.detail_std ');
            // var src=[];
            // console.log("下载图片了");
            for (var i = 0; i < href.length; i++) {
                var pageUrl =  href.eq(i).attr('src');
                var srcs= pageUrl.slice(0,-5);


                var filename = parseUrlForFileName(srcs); //生成文件名
                downloadImg(pageUrl, filename, './mei' , function() {
                    console.log(filename + ' done');
                });


                src.push(srcs);
                console.log(srcs);

            }
            console.log(src);
            callback(null,src);
        }
    });
}

function getA(page,callback){
    // var src=[];
    async.mapSeries(page,getDetail, function (err,result) {
        if (err) {
            console.log('err', err);
        }
        //见证奇迹
        callback(null, 'done');
    });

}
//获取图片的src


async.waterfall([
    getHtml,
    getHref,
    getA,
    function(arg1, callback) {

        // console.log(arg1+"是空数组么");
        callback(null, 'done');
    }
], function (err, result) {

});












//生成文件名
function parseUrlForFileName(address) {
    var filename = path.basename(address);
    return filename;
}
//下载图片
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


