// 从妹子图网站爬取照片

//网站连接http://www.mzitu.com/

// 最新 http://www.mzitu.com/
// 热门 http://www.mzitu.com/hot
// 推荐 http://www.mzitu.com/best


var rp = require('request-promise');

var cheerio = require('cheerio'); // Basically jQuery for node.js

let hotUrl = "http://www.mzitu.com/hot";

var pageUrl = [];


async function getPageUrl(url) {
    return new Promise(resolve => {
        var options = {
            url: url,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.108 Safari/537.36',
                'Connection': 'keep-alive'
            },
            transform: function (body) {
                return cheerio.load(body);
            }
        };

        rp(options)
            .then(function ($) {
                var alist = $("#pins li>a");
                var length = alist.length
                for (var i = 0; i < length; i++) {
                    // console.log(alist[i].attribs.href)
                    pageUrl.push(alist[i].attribs.href)
                    // console.log(pageUrl)
                    // console.log(2)
                }
                // console.log(1)
                resolve();
            })
    })
}

//  getPageUrl(hotUrl).then(()=>{
//     console.log(pageUrl)
// })

// 获取首页
async function getIndex() {
    await getPageUrl(hotUrl);
    // console.log(pageUrl)
}

// getIdex();
// getPages().then((x)=>{
//     console.log(x)
// });

// 获取分页数据
// e.g. url:http://www.mzitu.com/hot/page/2
var i = 2
async function getPages() {
    await getPageUrl(hotUrl);
    for (var i = 2; i < 9; i++) {
        var urls = "http://www.mzitu.com/hot/page/" + i;
        console.log("请等待")
        await getPageUrl(urls);
    }
    return pageUrl
    // console.log(pageUrl)
}

// 实际图片地址  http://i.meizitu.net/2018/04/04b01.jpg
// 获取图片连接




async function getImageSrc() {
    await getPages();
    console.log(pageUrl);

}

// getImageSrc()


// 获取单页的图片数据

var imgSrc = [];


function getOnePageImageSrc(url) {;
    var num = 0
    return new Promise(resolve => {
        var options = {
            url: url,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.108 Safari/537.36',
                'Connection': 'keep-alive'
            },
            transform: function (body) {
                return cheerio.load(body);
            }
        };

        rp(options)
            .then(function ($) {
                var src = $(".main-image img")[0].attribs.src;
                console.log(src);
                var newSrc = src.slice(0, -6);
                console.log(srcs)
                var nums = parseInt($(".pagenavi>a:last-child").prev().text());
                console.log(nums)
                for (var i = 1; i <= nums; i++) {
                    if (i < 10) {
                        imgSrcItem = newSrc + 0 + i + ".jpg"
                    } else {
                        imgSrcItem = newSrc + i + ".jpg"
                    }
                    imgsrc.push(imgSrcItem)
                }
                // var length = alist.length
                // for (var i = 0; i < length; i++) {
                //     // console.log(alist[i].attribs.href)
                //     pageUrl.push(alist[i].attribs.href)
                //     // console.log(pageUrl)
                //     // console.log(2)
                // }
                // console.log(1)
                console.log(imgSrc)
                resolve();
            })
    })
}
var pageurl = "http://www.mzitu.com/53563"
getOnePageImageSrc(pageurl)








// 

// 获取页面

// 分析页面内容

// 获取链接

// 储存内容