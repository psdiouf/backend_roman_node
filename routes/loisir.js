const express = require('express')
const routes = express.Router()
const controller = require('../controllers/loisir')


routes.get('/', controller.loisirs);


module.exports = routes;