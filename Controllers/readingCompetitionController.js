const ReadingCompetition = require('../Models/readingCompetition');

// קבלת כל הקטעים
exports.getAll = async (req, res) => {
  try {
    const passages = await ReadingCompetition.find();
    res.json(passages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// קבלת קטע לפי מזהה
exports.getById = async (req, res) => {
  try {
    const passage = await ReadingCompetition.findById(req.params.id);
    if (!passage) return res.status(404).json({ error: 'Not found' });
    res.json(passage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// יצירת קטע חדש
exports.create = async (req, res) => {
  try {
    const newPassage = new ReadingCompetition(req.body);
    await newPassage.save();
    res.status(201).json(newPassage);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// עדכון קטע
exports.update = async (req, res) => {
  try {
    const updated = await ReadingCompetition.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: 'Not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// מחיקת קטע
exports.remove = async (req, res) => {
  try {
    const deleted = await ReadingCompetition.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// לדוג' ב-readingCompetitionController.js
exports.getByLevel = async (req, res) => {
  try {
    console.log('getByLevel called with query:', req.query);
    const { level } = req.query;
    // אם יש level, מסנן לפי level, אחרת מחזיר הכל
    const filter = level ? { level } : {};
    const passages = await ReadingCompetition.find(filter);
    res.json(passages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};