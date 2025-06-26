const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/grammar-pdfs'));
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // אפשר להוסיף timestamp אם רוצים ייחודיות
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb(new Error('Only PDF files are allowed!'), false);
    }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;