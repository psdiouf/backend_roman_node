const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];

        const verif = jwt.verify(token, "TOKEN_GENERER_AUTOMATIQUEMENT");
        const userEmail = verif.userEmail;
        if (req.body.userEmail && req.body.userEmail !== userEmail) {
            throw 'invalid userId';
        } else {
            next();
        }

    }
    catch (err) {
        res.status(400).json({ error: err | 'non autorisé' });
    }

}