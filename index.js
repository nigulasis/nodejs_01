//导入相应模块
const http = require('http')
const fs = require('fs')
const path =require('path')

const server =http.createServer()

server.on('request',function(req,res){
    const url = req.url
    console.log(url);
    
    if(url==='/'||url==='/clock.html'){
        //当访问 '/' 或 '/clock.html' 时，读取的地址是一样的
        const fpath = path.join(__dirname,'./clock.html')
        fs.readFile(fpath, 'utf8', (err,dataStr)=>{
            if(err) {
                //若返回的是中文需要添加响应头，不然会乱码
                res.setHeader('Content-Type', 'text/html; charset=utf-8')
                return res.end('文件读取错误')
            }
            res.end(dataStr)
        })
    }else if(url==='/g2048.html' || url==='/c2048.css'||url==='/j2048.js'){
        //当html文件内链了其他文件，如css，js时，浏览器会主动像服务器进行资源的请求
        //在浏览器输入 /g2048.html 访问2048 页面时，实际访问了/g2048.html，/c2048.css ，/j2048.js 三个文件
        //注意path地址拼接的区别
        const fpath = path.join(__dirname,'js2048',url)
        fs.readFile(fpath,'utf8',(err,dataStr)=>{
            if(err) {
                res.setHeader('Content-Type', 'text/html; charset=utf-8')
                return res.end('文件读取错误')
            }
            res.end(dataStr)
        })
    }else{
        //英文不需要添加响应头
        res.end('404 Not Found.')
    }
})

server.listen(80,function(){
     console.log('server listen at http://127.0.0.1');
})