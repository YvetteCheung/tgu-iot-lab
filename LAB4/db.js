const { MongoClient } = require('mongodb')
const url = 'mongodb://localhost:27017/'

// 查询所有
async function findAll() {
  var client = null
  try {
    client = await MongoClient.connect(url)
    const collection = client.db('lab').collection('user')
    const res = await collection.find().toArray()
    return res
  } catch (err) {
    console.log('错误：' + err.message)
  } finally {
    client.close()
  }
}

/**
 * 查询一个
 * @param {number} id 用户学号
 * @returns 用户信息
 */
async function findOne(id) {
  var client = null
  try {
    client = await MongoClient.connect(url)
    const collection = client.db('lab').collection('user')
    const res = await collection.findOne({ id })
    return res
  } catch (err) {
    console.log('错误：' + err.message)
  } finally {
    client.close()
  }
}

//保存
async function save(user) {
  var client = null
  try {
    client = await MongoClient.connect(url)
    const collection = client.db('lab').collection('user')
    const res = await collection.insertOne(user)
  } catch (err) {
    console.log('错误：' + err.message)
  } finally {
    client.close()
  }
}

//删除
async function remove(id) {
  var client = null
  try {
    client = await MongoClient.connect(url)
    const collection = client.db('lab').collection('user')
    const res = await collection.deleteOne({ id })
  } catch (err) {
    console.log('错误：' + err.message)
  } finally {
    client.close()
  }
}

async function update(user) {
  var client = null
  try {
    client = await MongoClient.connect(url)
    const collection = client.db('lab').collection('user')
    const res = await collection.updateOne({ id: user.id }, { $set: user })
  } catch (err) {
    console.log('错误：' + err.message)
  } finally {
    client.close()
  }
}

module.exports = {
  findAll,
  findOne,
  save,
  remove,
  update
}