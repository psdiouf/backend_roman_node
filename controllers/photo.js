const models = require('../models')

exports.mesPhotos = (req, res, next) => {
    const idUser = req.params.id;
    models.Photo.findAll({
        where: { idUser: idUser }
    })
        .then(photos => {
            console.log(photos)
            res.status(200).json(photos);
        })
        .catch(err => {
            res.status(500).json({ err });
        })
}

exports.ajoutPhoto = (req, res, next) => {
    if (req.file) {
        const photo = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
        console.log(photo);
        models.Photo.create({
            url: photo,
            idUser: req.body.idUser
        })
            .then(photo => {
                return res.status(200).json({ photo: photo, success: true });
            })
            .catch(err => {
                res.status(500).json({ err })
            })
        return;
    }
}