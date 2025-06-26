const express = require('express');
const verifyJWT = require('../Middelwares/verifyJWT');
const verifyAdmin = require('../Middelwares/verifyAdmin');
const upload = require('../Middelwares/uploadGrammarPdf');
const router = express.Router();
const grammarController = require('../Controllers/grammarController');

router.get('/topics', grammarController.getGrammarTopics);

// העלאת קובץ דקדוק (ADMIN בלבד)
router.post(
    '/upload',
    verifyJWT,
    verifyAdmin,
    upload.single('pdf'),
    grammarController.uploadGrammarPdf
);

// מחיקת קובץ דקדוק (ADMIN בלבד)
router.delete(
    '/delete/:fileName',
    verifyJWT,
    verifyAdmin,
    grammarController.deleteGrammarPdf
);

module.exports = router;