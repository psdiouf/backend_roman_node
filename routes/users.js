const express = require('express')
const routes = express.Router()
const controllers = require('../controllers/user')
const auth = require('../middlewares/auth')
const multer = require('../middlewares/multer')
const controllersV = require('../controllers/villes');

routes.post('/inscription', controllers.inscription)
routes.post('/verification', controllers.verification)
routes.post('/login', controllers.connexion)
routes.post('/recherchecodepostal', auth, controllers.RechercheCodePostal);
routes.post('/modifierProfil', auth, controllers.modifierProfil);
routes.post('/modifierImageProfil', auth, multer, controllers.modifierImageProfil);
routes.post('/reinitialiserMotDePasse', controllers.reinitialiserMotDePasse);
routes.post('/modifierMotDePasse', auth, controllers.modifierMotDePasse);
routes.post('/changerMp', controllers.changerMp);
routes.post('/renvoiCode', controllers.renvoieCode);
routes.post('/modifierPresentation', auth, controllers.modifierPresentation)
routes.post('/interet', auth, controllers.modifierInteret);
//routes.post('/ajouterPhoto', auth, multer, controllers.ajoutPhoto);
routes.get('/', controllers.CreerVille);
routes.get('/villes', auth, controllersV.villes);


module.exports = routes