const express = require('express');
const multer = require('multer');
const path = require('path');
const { exec } = require('child_process');
const router = express.Router();

const upload = multer({ dest: 'uploads/' });

// העלאת קובץ CSV של אוצר מילים והרצת הסקריפט
router.post('/import-vocabulary', upload.single('file'), (req, res) => {
  const filePath = path.resolve(req.file.path);
  const level = req.body.level || 'Basic';
  const band = req.body.band || 'band1';
  exec(`node Models/importVocabulary.js "${filePath}" "${level}" "${band}"`, (error, stdout, stderr) => {
    if (error) return res.status(500).json({ error: stderr });
    res.json({ message: 'הקובץ הועלה והסקריפט רץ בהצלחה', output: stdout });
  });
});

// העלאת קובץ קטע הבנה והרצת הסקריפט
router.post('/import-reading', upload.single('file'), (req, res) => {
  const filePath = path.resolve(req.file.path);
  const level = req.body.level || 'Basic';
  exec(`node Models/importReading.js "${filePath}" "${level}"`, (error, stdout, stderr) => {
    if (error) return res.status(500).json({ error: stderr });
    res.json({ message: 'הקובץ הועלה והסקריפט רץ בהצלחה', output: stdout });
  });
});

module.exports = router;