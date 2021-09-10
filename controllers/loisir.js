
const models = require('../models')


exports.loisirs = (req, res, next) => {
    models.Loisir.findAll({})
        .then(loisirs => {
            res.status(200).json(loisirs)
        })
        .catch(err => {
            res.status(500).json({ err });
        })
}

