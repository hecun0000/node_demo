const express = require('express')
const app = express()
const articles = [
    { title: 'demo' },
    { title: 'test' }
]
// 设置端口
app.set('port', process.env.PORT || 3000)

// 获取所有文章
app.get('/articles', (req, res, next) => {
    res.send(articles)
})
// 创建一篇新文章
app.post('/articles', (req, res, next) => {
    res.send("ok")
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