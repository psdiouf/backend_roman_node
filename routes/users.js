const express = require('express')
const routes = express.Router()
const controllers = require('../controllers/user')
const auth = require('../middlewares/auth')

routes.post('/inscription', controllers.inscription)
routes.post('/verification', controllers.verification)
routes.post('/login', controllers.connexion)
routes.post('/recherchecodepostal', auth, controllers.RechercheCodePostal);
routes.post('/modifierProfil', controllers.modifierProfil);
routes.get('/', controllers.CreerVille);


module.exports = routes