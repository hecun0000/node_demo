var async = require('async');

var objs = [{name:'A'}, {name:'B'}, {name:'C'}];

function doSomething(obj, cb)
{
    console.log("我在做" + obj.name + "这件事!");
    cb(null, obj);
}

async.eachSeries(objs, function(obj, callback) {
    doSomething(obj,function () {
        console.log(obj);
        callback()
    });
}, function(err){
    console.log("err is:" + err);
});


//和each是有明显区别的，如果没有异步调用，和each无差别，如果有异步调用，则区别十分大  
async.eachSeries(objs, function(obj, callback) {
    doSomething(obj, function(){
        callback("It's a err.");
    });
}, function(err){
    console.log("err is:" + err);
});  