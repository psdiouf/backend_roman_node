const models = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const fastValidator = require('fastest-validator')
const mailer = require('nodemailer');
const mailerTransport = require('nodemailer-smtp-transport');
const loisir = require('../models/loisir');

const transporter = mailer.createTransport(mailerTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
        username: 'ROMAN',
        user: 'testeapplicationflutter@gmail.com',
        pass: 'Teste2021'
    }
}));
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
        return res.status(401).json({ message: "erreur de validation", errors: validation, error: true, success: false })
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
                    res.status(200).json(
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


exports.modifierPresentation = (req, res, next) => {

    models.User.update({
        texte: req.body.texte === 'null' ? null : req.body.texte
    }, { where: { email: req.body.userEmail } })
        .then(resultat => {
            if (!resultat) {
                return res.status(200).json({ message: "echec modification", success: false });
            }
            return res.status(200).json({ message: "modification reussi", success: true });
        })
        .catch(err => {
            res.status(500).json({ err });
        })
}

exports.modifierInteret = (req, res, next) => {
    const post = {
        idLoisir: req.body.idLoisir === "null" ? null : parseInt(req.body.idLoisir),
        artiste: req.body.artiste === "null" ? null : req.body.artiste,
        serie: req.body.film === "null" ? null : req.body.film,
        sortir: req.body.sortir === "null" ? null : req.body.sortir
    }
    console.log(req.body)
    console.log(post)
    models.User.update(post, { where: { email: req.body.userEmail } })
        .then(resultat => {
            if (!resultat) {
                return res.status(200).json({ message: "echec de modification", success: false });
            }
            return res.status(200).json({ message: "modification interet", success: true });
        })
        .catch(err => {
            res.status(500).json({ err });
        })

}

exports.renvoieCode = (req, res, next) => {
    console.log(req.body);
    const code = (1000 + Math.floor(Math.random() * 9000)).toString();
    var mailOptions = {
        from: 'Roman',
        username: 'ROMAN',
        user: 'ROMAN',
        to: req.body.email,
        subject: "Code de validation de votre compte ",
        text: "Bonjour voici le code de validation pour votre compte : " + code
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: error, message: "erreur lors de l'envoi du mail" });
        }
        return res.status(200).json({ message: 'Email envoyé: ' + info.response, "code": code, success: true })

    });
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
            return res.status(200).json({ errorPseudo: true, message: "le pseudo est déja utilisé", success: false, errorEmail: false });
        }
        models.User.findOne({ where: { email: req.body.email } })
            .then(user => {
                if (user) {
                    return res.status(200).json({ errorEmail: true, message: "email déja utilisé", success: false, errorPseudo: false })
                }

                const code = (1000 + Math.floor(Math.random() * 9000)).toString();
                var mailOptions = {
                    from: 'Roman',
                    username: 'ROMAN',
                    user: 'ROMAN',
                    to: req.body.email,
                    subject: "Code de validation de votre compte ",
                    text: "Bonjour voici le code de validation pour votre compte : " + code
                };

                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                        return res.status(500).json({ error: error, message: "erreur lors de l'envoi du mail" });
                    }
                    return res.status(200).json({ message: 'Email envoyé: ' + info.response, "code": code, success: true })

                });


                // return res.status(200).json({ success: true, message: "l'email ainsi que le pseudo sont corrects" })
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


}

exports.CreerVille = (req, res, next) => {
    // models.Loisir.create({
    //     libelle: 'lecture'
    // })
    //     .then(loisir => {
    //         res.status(200).json(loisir)
    //     })
    //     .catch(err => {
    //         res.status(400).json({ err })
    //     })
    // models.Ville.create({
    //     nom: "dakar"
    // })
    //     .then(ville => {
    //         res.status(200).json(ville);
    //     })
    //     .catch(err => {
    //         res.status(500).json({ err });
    //     })


}


exports.reinitialiserMotDePasse = (req, res, next) => {
    models.User.findOne({ where: { email: req.body.email } })
        .then(user => {
            if (!user) {
                return res.status(200).json({ success: false, message: "Ce email n'existe pas" });
            }


            const code = (1000 + Math.floor(Math.random() * 9000)).toString();
            var mailOptions = {
                from: 'Roman',
                userName: 'ROMAN',
                to: req.body.email,
                subject: "Code de reinitialisation de mot de passe ",
                text: "Bonjour voici le code pour reinitialiser votre mot de passe : " + code
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                    return res.status(500).json({ error: error, message: "erreur lors de l'envoi du mail" });
                }
                return res.status(200).json({ message: 'Email envoyé: ' + info.response, "code": code, success: true })

            });

        })
        .catch(err => {
            res.status(500).json({ err });
        })
}

exports.RechercheCodePostal = (req, res, next) => {
    models.User.findAll({
        where: {

            codePostal: req.body.codePostal
        },
        include: [{
            model: models.Ville,
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
    console.log(req.body);
    const post = {
        name: req.body.name,
        email: req.body.email,
        sexe: req.body.sexe !== 'null' ? req.body.sexe : null,
        codePostal: req.body.codePostal !== 'null' ? req.body.codePostal : null,
        dateDeNaissance: req.body.dateDeNaissance !== 'null' ? req.body.dateDeNaissance : null,
        idVille: req.body.ville !== 'null' ? req.body.ville : null

    }
    models.User.findOne({ where: { email: req.body.email } })
        .then(user => {
            if (user) {
                if (user.id != req.body.id) {
                    return res.status(200).json({ success: false, email: "le email est déja utilisé", errorEmail: true });
                }
                return;
            }
        })
        .catch(err => {
            res.status(500).json({ err })
        })
    models.User.findOne({ where: { name: req.body.name } })
        .then(user => {
            if (user) {
                if (user.id != req.body.id) {
                    return res.status(200).json({ success: false, pseudo: "le pseudo est déja utilisé", errorPseudo: true });
                }
                models.User.update(post, { where: { id: req.body.id } })
                    .then(user => {
                        return res.status(200).json({ success: true, message: "modification reussi" });
                    })
                    .catch(err => {
                        res.status(500).json({ err });
                    })
                return;
            }
        })
        .catch(err => {
            res.status(500).json({ err })
        })
    // if (req.body.dateDeNaissance == null) {
    //     return res.status(200).json({ message: "la date de naissance est null" });
    // }
    // res.status(200).json(req.body);
}

exports.modifierImageProfil = (req, res, next) => {

    if (req.file) {
        // console.log(`${req.protocol}://${req.get('host')}/images/${req.file.filename}`);
        // console.log(req.file.mimetype)
        const lien = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
        const email = req.body.email;
        // const filename = req.file.filename;
        // console.log(req.body.email);

        models.User.update({
            profil: lien
        },
            { where: { email: email } })
            .then((resultat) => {
                res.status(200).json({ success: true, message: "image profil modifier avec succé", image: lien });
            })
            .catch(error => { res.status(400).json({ error }) })

        return

    }
    return res.status(200).json("aucune image");
}

exports.changerMp = (req, res, next) => {

    if (req.body.newpassword === req.body.confirm) {

        bcrypt.hash(req.body.newpassword, 10)
            .then(hash => {
                models.User.update({ password: hash }, { where: { email: req.body.userEmail } })
                    .then(reponse => {
                        if (!reponse) {
                            return res.status(400).json({ message: "utilisateur introuable", success: false });
                        }
                        return res.status(200).json({ message: "mot de passe reinitialisé avec succé", success: true });
                    })
                    .catch(err => {
                        res.status(500).json({ err });
                    })
            })
            .catch(err => {
                res.status(500).json({ err })
            })
    }
}

exports.modifierMotDePasse = (req, res, next) => {
    if (req.body.newpassword === req.body.confirm) {
        models.User.findOne({ where: { email: req.body.userEmail } })
            .then(user => {
                bcrypt.compare(req.body.password, user.password)
                    .then(resultat => {

                        if (!resultat) {
                            return res.status(200).json({ message: "le mot de passe est incorrect", success: false });
                        }
                        bcrypt.hash(req.body.newpassword, 10)
                            .then(mp => {
                                models.User.update({ password: mp }, { where: { email: user.email } })
                                    .then(r => {
                                        res.status(200).json({ message: "mot de passe modifier avec succé", success: true });
                                    })
                                    .catch(err => {
                                        res.status(500).json({ err });
                                    })
                            })
                            .catch(err => {
                                res.status(500).json({ err });
                            })
                    })
                    .catch(err => {
                        res.status(500).json({ err });
                    })
            })
            .catch(err => {
                res.status(500).json({ err });
            })
        return;
    }
}