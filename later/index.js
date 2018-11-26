const express = require('express')
const app = express()

const port = process.env.PORT || 3000
app.get('/',(req,res)=>{
	res.send('hello world')
})

app.listen(port,()=>{
	console.log("这是我第一个node应用，运行在"+ port +"端口")
})
