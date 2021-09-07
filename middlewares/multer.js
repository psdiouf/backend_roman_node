const multer = require('multer');

const MIME_TYPE = {
    "jpg": 'jpg',
    "jpeg": 'jpeg',
    "png": 'png',

}
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images')
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPE[name.split('.')[1]];
        callback(null, name.split('.')[0] + Date.now() + '.' + extension)
    }
});

module.exports = multer({ storage: storage }).single('image')