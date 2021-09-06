const express = require('express')
const app = express()
const bodyParse = require('body-parser')
const users = require('./routes/users')
const path = require('path');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParse.json())
app.use(express.urlencoded({ extended: true }))
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParse.urlencoded({ extends: true }));
app.use('/images', express.static(path.join(__dirname, 'images')))
app.use('/user', users)

module.exports = app;