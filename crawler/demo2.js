const request = require('request');
var cheerio = require('cheerio');
var path = require('path');
var fs = require('fs');
var async = require('async');
var mkdirp = require('mkdirp');
console.log("hello");


var all=[];
// 获取url地址
function getUrl(){
    
    var options = {
        url: "https://bcy.net/u/33957/post/cos",
        headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.99 Safari/537.36',
            'Connection': 'keep-alive'
        }
    };
    console.log('打开新世界大门：' + options.url);
    request(options, function(error, response, body) {
        if (error) console.log(error);
        if (!error && response.statusCode == 200) {
            // console.log(body);
            var $ = cheerio.load(body);
            var aimg = $('.postWorkCard__link');


             for (var i = 0; i < aimg.length; i++) {
                    var imgsrc = "https://bcy.net"+aimg.eq(i).attr('href')+"";
                    // console.log(imgsrc);
                    all.push(imgsrc);
                   
                }
 console.log(all);
 console.log(all.length);
   console.log("--------------------------------------------");
            
               var j = 0;
                var timer = setInterval(()=>{
                        console.log(all[j]);
                        j++; 
                        var url = all[j];
                        fetchUrl(all[j]);
                        if (j>all.length-1) {
                            clearInterval(timer);
                        }
                },1200)
            
  console.log("--------------------------------------------");
        }
    })
}

getUrl();


function fetchUrl(url) {
    var options = {
        url: url,
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


//fetchUrl(url);


function acquireData(url, data) {
    var $ = cheerio.load(data);
    
    console.log($);
    var meizi = $('.detail_std');
    
    // console.log(meizi);
    // var imgsrc = meizi[0].namespace;
    console.log(meizi.length);
    for (var i = 0; i < meizi.length; i++) {
        var imgsrc = meizi.eq(i).attr('src');
        // curPageUrls.eq(i).attr('href');
        console.log(imgsrc);
        var times = new Date().getTime();
        var filename = parseUrlForFileName(imgsrc)+times+".jpg"; //生成文件名
        downloadImg(imgsrc, filename, './mei' , function() {
            console.log(filename + ' done');
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