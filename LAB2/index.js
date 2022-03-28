const  http = require("http");
const url = require('url');
const fs = require("fs")
const path = require("path")

const  host = 'localhost';
const  port = 3000;

const name = path.basename('./lab2.2.html')
//渲染模板文件
function template(filename,data){
    const file = fs.readFileSync(filename,'utf-8')
    let result = ''
    Object.entries(data).forEach(([key,value])=>{
        result = file.replace(new RegExp(`"${key}"`, 'g'), value)
    });
    return result;
}
//编写获取时间函数
function getTime(){
    const date = new Date()
    const hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
    const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
    const seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
    return hour + ':' + minutes + ':' + seconds
}
function getDate(){
    const today = new Date()
    const year = today.getFullYear()
    const month = today.getMonth()
    const date = today.getDate()
    return year + '-' + month + '-' + date
}
//创建服务器
const server = http.createServer((req,res)=>{
    // res.writeHead(200);
    var pathname = url.parse(req.url).pathname;
    // console.log(pathname)
    if(pathname == '/getTime'){
        console.log(getTime());
        res.end(template(name,{text:getTime()})
    )}
    else if(pathname == '/getDate'){
        console.log(getDate());
        res.end(template(name,{text:getDate()})
    )}
    else res.end(template(name,{text:'LAb2'}))
})
server.listen(port,host, () => {
    console.log(`Server is running on http://${host}:${port}`);
})