const express = require('express');
const routes = express.Router();
const conttroller = require('../controllers/photo');
const auth = require('../middlewares/auth')
const multer = require('../middlewares/multer');


routes.post('/ajouterPhoto', auth, multer, conttroller.ajoutPhoto);
routes.get('/:id', conttroller.mesPhotos);

module.exports = routes;