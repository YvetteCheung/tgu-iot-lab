const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const { response } = require('express')
const app = express()
const port = 3000
const host = 'localhost'

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(multer().single('avatar'))

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'uploads')))

var entries = {
  name:'',
  id:'',
  avatar:''
}

function template(filename,data){
  const file = fs.readFileSync(filename,'utf-8')
  let result = file
  Object.entries(data).forEach(([key,value])=>{
      result = result.replace(new RegExp(`{{${key}}}`, 'g'), value)
  });
  return result;
}

app.get('/', function (req, res) {
   res.end(template('views/page.html',data ={...entries}))
})

app.post('/', function(req, res) {
  const {name, id} = req.body
  let avatarName = ''
  let avatarPath = ''
  let filePath = ''
  if (req.file) {
    const buffer = req.file.buffer
    avatarName = id + '-' + Date.now() + path.parse(req.file.originalname).ext
    avatarPath = `uploads/${avatarName}`
    fs.writeFileSync(avatarPath, buffer)
  }

   const data = {
     ...entries,
     name,
     id,
     avatar: `${avatarName}`,
   }

   const str = template('views/tem.html',data)
   filePath = `uploads/${id}.html`
   fs.writeFileSync(filePath,str)
   res.end(str)

})

app.post('/query',function(req,res){
  const { id } = req.body
  res.end(fs.readFileSync(`uploads/${id}.html`, 'utf-8'))
})
app.listen(port,host, () => {
  console.log(`Sever is running on http://${host}:${port}`)
})