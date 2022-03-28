const http = require("http");

const host = 'localhost';
const port = 3000;

function getTime(){
    const date = new Date(Date.now())
    const hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
    const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
    const seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()

  return hour + ':' + minutes + ':' + seconds
}
const server = http.createServer((req,res)=>{
    // res.writeHead(200);
    res.end(`<html><meta charset="utf-8"/><body><div style="text-align:center;margin:100px"><h1>当前时间是：${getTime()}</h1></div></body></html>`)
})
server.listen(port,host, () => {
    console.log(`Server is running on http://${host}:${port}`);
})