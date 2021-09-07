const models = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const fastValidator = require('fastest-validator')

exports.connexion = (req, res, next) => {
    console.log(req.body.name)
    models.User.findOne({ where: { name: req.body.name }, include: [models.Ville] })
        .then(user => {
            if (!user) {
                return res.status(400).json({ success: false, error: "login ou mot de passe incorrect" })
            }
            console.log(user);
            bcrypt.compare(req.body.password, user.password)
                .then(resultat => {
                    if (!resultat) {
                        return res.status(400).json({ success: false, error: "login ou mot de passe incorrect" })
                    }
                    res.status(201).json(
                        {
                            message: "user trouvé",
                            success: true,
                            user: user,
                            token: jwt.sign(
                                { userEmail: user.email },
                                "TOKEN_GENERER_AUTOMATIQUEMENT",
                                { expiresIn: "24h" }
                            )
                        })
                })
                .catch(err => {
                    res.status(500).json({ error: err | "erreur lors de la comparaison" })
                })

        })
        .catch(err => {
            res.status(500).json({ err })
        })
}

exports.inscription = (req, res, next) => {
    const shema = {
        name: { optional: false, type: "string", max: "100" },
        email: { optional: false, type: "email", max: "100" },
        password: { optional: false, type: "string", max: "20" },
    }
    const v = new fastValidator();
    const validation = v.validate(req.body, shema);
    if (validation !== true) {
        return res.status(401).json({ message: "erreur de validation", errors: validation, error: true })
    }
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            models.User.create({
                name: req.body.name,
                email: req.body.email,
                password: hash,
                profil: `${req.protocol}://${req.get('host')}/images/photo.png`
            })
                .then(user => {
                    res.status(201).json(
                        {
                            message: "user trouvé",
                            success: true,
                            user: user,
                            token: jwt.sign(
                                { userEmail: user.email },
                                "TOKEN_GENERER_AUTOMATIQUEMENT",
                                { expiresIn: "24h" }
                            )
                        })
                })
                .catch(err => {
                    res.status(500).json({ err })
                })
        })

}

exports.verification = (req, res, next) => {
    const shema = {
        name: { optional: false, type: "string", max: "100" },
        email: { optional: false, type: "email", max: "100" },
        password: { optional: false, type: "string", max: "20" },
    }
    const v = new fastValidator();
    const validation = v.validate(req.body, shema);
    if (validation !== true) {
        return res.status(401).json({ message: "erreur de validation", errors: validation, error: true })
    }
    models.User.findOne({
        where: { name: req.body.name }
    }).then(user => {
        if (user) {
            return res.status(200).json({ message: "le pseudo est déja utilisé" });
        }
        models.User.findOne({ where: { email: req.body.email } })
            .then(user => {
                if (user) {
                    return res.status(200).json({ message: "email déja utilisé" })
                }
                res.status(200).json({ message: "l'email ainsi que le pseudo sont corrects" })
            })
            .catch(err => {
                res.status(500).json({ err });
            })
    })
        .catch(err => {
            res.status(500).json({ err });
        })
}

exports.CreerUser = (req, res, next) => {


    models.User.create({
        name: 'ousmane10',
        email: 'ousmane@gmail.com',
        profil: 'photo.png',
        password: '12345678',

    })
        .then(user => {
            res.status(201).json(user);
        })
        .catch(err => {
            res.status(500).json({ err })
        })
        ;

    //    User::create([
    //     'name'=>'ousseynou',
    //     'email'=>'ousseynou@gmail.com',
    //     'profil'=>'photo.png',
    //     'password' => bcrypt('12345678'),
    //     // 'ville'=>'dakar'
    //    ]);

    //    User::create([
    //     'name'=>'bacary20',
    //     'email'=>'bacary@gmail.com',
    //     'profil'=>'photo.png',
    //     'password' => bcrypt('12345678'),
    //     // 'ville'=>'thies'
    //    ]);

    //    User::create([
    //     'name'=>'kalneymar10',
    //     'email'=>'kalneymar@gmail.com',
    //     'profil'=>'photo.png',
    //     'password' => bcrypt('12345678'),
    //     // 'ville'=>'dakar'
    //    ]);

    //    User::create([
    //     'name'=>'bmg',
    //     'email'=>'bmg@gmail.com',
    //     'profil'=>'photo.png',
    //     'password' => bcrypt('12345678'),
    //     // 'ville'=>'dakar'
    //    ]);

    //    User::create([
    //     'name'=>'laye10',
    //     'email'=>'laye@gmail.com',
    //     'profil'=>'photo.png',
    //     'password' => bcrypt('12345678'),
    //     // 'ville'=>'paris'
    //    ]);

    //    User::create([
    //     'name'=>'cheihk2020',
    //     'email'=>'cheihk@gmail.com',
    //     'profil'=>'photo.png',
    //     'password' => bcrypt('12345678'),
    //     // 'ville'=>'dakar'
    //    ]);

    //    User::create([
    //     'name'=>'sbd10',
    //     'email'=>'sbd@gmail.com',
    //     'profil'=>'photo.png',
    //     'password' => bcrypt('12345678'),
    //     // 'ville'=>'diourbel'
    //    ]);

    //    User::create([
    //     'name'=>'cyc',
    //     'email'=>'cyc@gmail.com',
    //     'profil'=>'photo.png',
    //     'password' => bcrypt('12345678'),
    //     // 'ville'=>'dakar'
    //    ]);

    //    User::create([
    //     'name'=>'elninho',
    //     'email'=>'elninho@gmail.com',
    //     'profil'=>'photo.png',
    //     'password' => bcrypt('12345678'),
    //     // 'ville'=>'dakar'
    //    ]);


}

exports.CreerVille = (req, res, next) => {
    models.Ville.create({
        nom: "dakar"
    })
        .then(ville => {
            res.status(200).json(ville);
        })
        .catch(err => {
            res.status(500).json({ err });
        })
}

exports.RechercheCodePostal = (req, res, next) => {
    models.User.findAll({
        include: [{
            model: models.Ville,
            where: {
                nom: req.body.ville
            }
        }]
    })
        .then(users => {
            console.log(users);
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json({ err });
        })


}
exports.modifierProfil = (req, res, next) => {
    res.status(200).json(req.body);
}

exports.modifierImageProfil = (req, res, next) => {

    if (req.file) {
        console.log(`${req.protocol}://${req.get('host')}/images/${req.file.filename}`);
        console.log(req.file.mimetype)
        const lien = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
        const email = req.body.email;
        // const filename = req.file.filename;
        console.log(req.body.email);

        models.User.update({
            profil: lien
        },
            { where: { email: email } })
            .then((resultat) => {
                return res.status(200).json({ success: true, message: "image profil modifier avec succé", image: lien });
            })
            .catch(error => { return res.status(400).json({ error }) })

        return

    }
    return res.status(200).json("aucune image");
}