const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const articles = [
    { title: 'demo' },
    { title: 'test' }
]


// 设置端口
app.set('port', process.env.PORT || 3000)

// 支持编码为JSON的请求消息体
app.use(bodyParser.json())
// 支持编码为表单的请求消息体
app.use(bodyParser.urlencoded({extended:true}))

// 获取所有文章
app.get('/articles', (req, res, next) => {
    res.send(articles)
})
// 创建一篇新文章
app.post('/articles', (req, res, next) => {
    const article = {title:req.body.title}
    articles.push(article)
    res.send(article)
})
// 获取指定文章
app.get('/articles/:id', (req, res, next) => {
    const id = req.params.id
    console.log('Fetching', id)
    res.send(articles[id])
})
// 删除指定文章
app.delete('/articles/:id', (req, res, next) => {
    const id = req.params.id
    console.log('Deleting', id)
    delete articles[id]
    res.send('Delete success')
})

app.listen(app.get('port'), () => {
    console.log("app started on port", app.get('port'))
})

module.exports = app