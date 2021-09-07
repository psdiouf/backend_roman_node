const express = require('express')
const routes = express.Router()
const controllers = require('../controllers/user')
const auth = require('../middlewares/auth')
const multer = require('../middlewares/multer')

routes.post('/inscription', controllers.inscription)
routes.post('/verification', controllers.verification)
routes.post('/login', controllers.connexion)
routes.post('/recherchecodepostal', auth, controllers.RechercheCodePostal);
routes.post('/modifierProfil', controllers.modifierProfil);
routes.post('/modifierImageProfil', auth, multer, controllers.modifierImageProfil);
routes.get('/', controllers.CreerVille);


module.exports = routes