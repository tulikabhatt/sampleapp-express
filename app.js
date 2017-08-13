const express = require('express')
const app = express()
_dirname = '/home/strider/github/sampleapp-express'

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html')
  //res.send('Hello World!')
})

app.post('/', function (req, res) {
  res.send('Got a POST request')
})

app.get('/user', function (req, res) {
  res.send('Got a GET request at /user')
})

app.put('/user', function (req, res) {
  res.send('Got a PUT request at /user')
})

app.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
  console.log('Directory name '+_dirname);
})
