const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './images')
    },
    filename: (req, file, callback) =>{
        callback(null, Date.now() + '--' + file.originalname);
    }
});

const fileFilter = (req, file, callback) => {
    if((file.mimetype).includes('jpeg') || (file.mimetype).includes('png') || (file.mimetype).includes('jpg')) {
        callback(null, true);
    } else {
        callback(null, false);
    }
};

const uploadImage = multer({ storage: storage, fileFilter: fileFilter });
module.exports = uploadImage.single('image');