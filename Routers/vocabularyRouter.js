const express = require('express');
const vocabularyController = require('../Controllers/VocabularyController');

const router = express.Router();

// סדר נכון של הנתיבים!
router.get('/search', vocabularyController.searchWords); // <-- קודם!
router.get('/', vocabularyController.getAllWords);
router.get('/getWords', vocabularyController.getVocabularyByLevel);
router.get('/:id', vocabularyController.getVocabularyById);
router.post('/', vocabularyController.createVocabulary);
router.put('/:id', vocabularyController.updateVocabulary);
router.delete('/:id', vocabularyController.deleteVocabulary);
router.post('/findByTextField', vocabularyController.findByTextField);
// router.post('/findByLevel', vocabularyController.findByLevel);
router.post('/byIds', vocabularyController.getVocabularyByIds); // Batch fetch by IDs

module.exports = router;