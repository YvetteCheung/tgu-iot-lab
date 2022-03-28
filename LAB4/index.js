const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer')
const fs = require('fs')
const path = require('path')
const ejs = require('ejs')
const app = express()
const port = 3000
const host = 'localhost'

const { findAll, findOne, save, remove, update } = require('./db')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(multer().single('avatar'))

// 设置静态路径
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'uploads')))
// set the view engine to ejs
app.engine('.html', ejs.__express)
// 设置视图路径
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'html')

//page.html
app.get('/', async function (req, res) {
  const list = await findAll()
  res.render('tem', {
    list,
  })
})

app.get('/save', (req, res) => {
  res.render('page')
})

app.post('/save', async (req, res) => {
  const { name, id } = req.body

  let avatarName = ''
  let avatarPath = ''
  if (req.file) {
    const buffer = req.file.buffer
    avatarName = id + '-' + Date.now() + path.parse(req.file.originalname).ext
    avatarPath = `uploads/${avatarName}`
    fs.writeFileSync(avatarPath, buffer)
  }

  const user = {
    name,
    id,
    avatar: avatarName,
  }

  await save(user)

  res.redirect('/')
})

app.get('/delete', async (req, res) => {
  const { id } = req.query
  await remove(id)
  res.redirect('/')
})

app.get('/update', async (req, res) => {
  const { id } = req.query
  const user = await findOne(id)
  res.render('update', {
    ...user,
  })
})

app.post('/update', async (req, res) => {
  const { id, name } = req.body

  let avatarName = ''
  let avatarPath = ''
  if (req.file) {
    const buffer = req.file.buffer
    avatarName = id + '-' + Date.now() + path.parse(req.file.originalname).ext
    avatarPath = `uploads/${avatarName}`
    fs.writeFileSync(avatarPath, buffer)

    const user = {
      id,
      name,
      avatar: avatarName,
    }
    await update(user)
  } else {
    const user = {
      id,
      name,
    }
    await update(user)
  }
  res.redirect('/')
})

app.listen(port, host, () => {
  console.log(`Sever is running on http://${host}:${port}`)
})
