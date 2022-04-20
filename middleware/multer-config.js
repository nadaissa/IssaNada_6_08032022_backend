//multer import
const multer = require('multer');

//configuration of the image storage path
const storage = multer.diskStorage({
    //specification of the folder path
    destination: (req, file, callback) => {
        callback(null, './images')
    },
    //file naming format
    filename: (req, file, callback) =>{
        //name generation with date, seperators and original file name
        callback(null, Date.now() + ('--') + file.originalname);
    }
});

//filtering the extension possibilities so it doesn't repeat the extension
//in case it is already present in the original filename
const fileFilter = (req, file, callback) => {
    if((file.mimetype).includes('jpeg') || (file.mimetype).includes('png') || (file.mimetype).includes('jpg')) {
        callback(null, true);
    } else {
        callback(null, false);
    }
};

//configuration of the multer upload with the two functions
const uploadImage = multer({ storage: storage, fileFilter: fileFilter });
module.exports = uploadImage.single('image');