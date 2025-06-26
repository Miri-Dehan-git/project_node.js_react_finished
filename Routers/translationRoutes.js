const express = require('express');
const verifyJWT = require("../Middelwares/verifyJWT")

const router = express.Router();
const translationController = require('../Controllers/translationController');

// סדר נכון של הנתיבים: קודם הספציפיים, אחר כך הדינמי
router.get('/pronunciation/:num', translationController.getWordToPronunciationByLevel);
router.get('/spelling/:num', translationController.getWordToSpellingByLevel);

// Get all translations
router.get('/', verifyJWT, translationController.getAllTranslations);

// Get translation by ID
router.get('/:id', verifyJWT, translationController.getTranslationById);

// Create new translation
router.post('/', verifyJWT, translationController.createTranslation);

// Update translation
router.put('/:id', verifyJWT, translationController.updateTranslation);

// Delete translation
router.delete('/:id', verifyJWT, translationController.deleteTranslation);


module.exports = router;