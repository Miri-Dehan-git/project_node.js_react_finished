const express = require('express');
const router = express.Router();
const controller = require('../Controllers/readingCompetitionController');

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);
router.get('/', controller.getByLevel);
module.exports = router;