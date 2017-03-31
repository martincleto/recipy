const express = require('express');
const mongoose = require('mongoose');
const app = express();

//const db = mongoose.connect('mongodb://localhost/frigde');

app.get('/', function (req, res) {
  res.redirect('/api');
})

app.get('/api', function (req, res) {
  res.send('recipy API');
})

app.listen(8765, function() {
  console.log('listening on 8765');
})
