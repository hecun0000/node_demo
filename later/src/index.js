const express = require('express')
const bodyParser = require('body-parser')
const Article = require('./db').Article

const app = express()


// 设置端口
app.set('port', process.env.PORT || 3000)

// 支持编码为JSON的请求消息体
app.use(bodyParser.json())
// 支持编码为表单的请求消息体
app.use(bodyParser.urlencoded({ extended: true }))

// 获取所有文章
// app.get('/articles', (req, res, next) => {
//     Article.all((err, articles) => {
//         if (err) return next(err)
//         res.send(articles)
//     })
// })

app.get('/articles', (req, res, next) => {
    Article.all((err, articles) => {
        if (err) return next(err)
        // res.send(articles)
        res.format({
            html:()=>{
                res.render('articles.ejs',{
                    articles:articles
                })
            },
            json:()=>{
                res.send(articles)
            }
        })
    })
})




// 创建一篇新文章
app.post('/articles', (req, res, next) => {
    Article.create({ title: req.body.title, content: req.body.content }, (err, article) => {
        if (err) return next(err)
        res.send('OK')
    })
})

// 获取指定文章
app.get('/articles/:id', (req, res, next) => {
    const id = req.params.id
    Article.find(id, (err, article) => {
        if (err) return next(err)
        res.send(article)
    })
})
// 删除指定文章
app.delete('/articles/:id', (req, res, next) => {
    const id = req.params.id
    Article.delete(id, (err) => {
        if (err) return next(err)
        res.send({ message: 'Deleted' })
    })
})

app.listen(app.get('port'), () => {
    console.log("app started on port", app.get('port'))
})

module.exports = app