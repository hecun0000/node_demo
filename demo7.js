
// 从妹子图网站爬取照片

//网站连接http://www.mzitu.com/

// 最新 http://www.mzitu.com/
// 热门 http://www.mzitu.com/hot
// 推荐 http://www.mzitu.com/best


var rp = require('request-promise');

var cheerio = require('cheerio'); // Basically jQuery for node.js

var options = {
    url: "http://www.mzitu.com/128289",
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.108 Safari/537.36',
        'Connection': 'keep-alive',
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
        "Referer": "http://www.mzitu.com/128289",
        "Host": "i.meizitu.net",
        "Pragma": "no-cache"
    },
    transform: function (body) {
        console.log(body)
        return cheerio.load(body);
    }
};

// headers = {
//     Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
//     "Accept-Encoding": "gzip, deflate",
//     "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
//     "Cache-Control": "no-cache",
//     Host: "i.meizitu.net",
//     Pragma: "no-cache",
//     "Proxy-Connection": "keep-alive",
//     Referer: data.url, //根据爬取的网址跟换 

//     "Upgrade-Insecure-Requests": 1,
//     "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.19 Safari/537.36"
// };

rp(options)
    .then(function ($) {
        // Process html like you would with jQuery...
        // console.log($)
        // var imgSrc = $(".main-image img")[0].attr("href");
        console.log(12)
        console.log($(".main-image img")[0])
        console.log($(".main-image").find("img")[0].attribs.src)
        // console.log(imgSrc)
    })
    .catch(function (err) {
        // Crawling failed or Cheerio choked...
    });



// 实际图片地址  http://i.meizitu.net/2018/04/04b01.jpg


// 获取页面

// 分析页面内容

// 获取链接

// 储存内容