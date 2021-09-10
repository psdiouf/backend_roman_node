const models = require('../models')

exports.villes = (req, res, next) => {
    models.Ville.findAll()
        .then(villes => {
            res.status(200).json(villes);
        })
        .catch(err => {
            res.status(500).json({ err });
        })
}