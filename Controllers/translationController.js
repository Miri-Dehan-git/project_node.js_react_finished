const translationRepository = require('../Repositories/translationRepository ');
const jwt = require('jsonwebtoken');

// מיפוי רמות מספריות/מילוליות לערך במסד הנתונים
const LEVEL_MAP = {
  '1': 'Basic',
  '2': 'Intermediate',
  '3': 'Good',
  'Basic': 'Basic',
  'Intermediate': 'Intermediate',
  'Good': 'Good',
  'basic': 'Basic',
  'intermediate': 'Intermediate',
  'good': 'Good',
  // הוסף כאן רמות בעברית אם צריך
};

// Get all translations
exports.getAllTranslations = async (req, res) => {
    try {
        const { q } = req.query;
        let translations;

        // אם אין q - דרוש טוקן
        if (!q) {
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                return res.status(401).json({ message: 'Missing or invalid token' });
            }

            const token = authHeader.split(' ')[1];
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
            } catch (err) {
                return res.status(403).json({ message: 'Invalid or expired token' });
            }
        }

        if (q) {
            translations = await translationRepository.searchTranslations(q);
        } else {
            translations = await translationRepository.findAllTranslations();
        }

        res.json(translations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get translation by ID
exports.getTranslationById = async (req, res) => {
    try {
        const translation = await translationRepository.findTranslationById(req.params.id);
        if (!translation) return res.status(404).json({ message: 'Translation not found' });
        res.json(translation);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create new translation
exports.createTranslation = async (req, res) => {
    try {
        const translation = await translationRepository.createTranslation(req.body);
        res.status(201).json(translation);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Update translation
exports.updateTranslation = async (req, res) => {
    try {
        const translation = await translationRepository.updateTranslation(req.params.id, req.body);
        if (!translation) return res.status(404).json({ message: 'Translation not found' });
        res.json(translation);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete translation
exports.deleteTranslation = async (req, res) => {
    try {
        const translation = await translationRepository.deleteTranslation(req.params.id);
        if (!translation) return res.status(404).json({ message: 'Translation not found' });
        res.json({ message: 'Translation deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get random word by level (כולל מיפוי רמות)
exports.getWordToPronunciationByLevel = async (req, res) => {
    try {
        let level = req.query.level;
        level = LEVEL_MAP[level] || level;
        if (!level) return res.status(400).json({ message: 'Level is required' });
        const word = await translationRepository.getWordToPronunciationByLevel(level);
        if (!word) return res.status(404).json({ message: 'No words found for this level' });
        res.json({
            POS: word.POS,
            sourceText: word.sourceText,
            translatedText: word.translatedText,
            image: word.image,
            level: word.level
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getWordToSpellingByLevel = async (req, res) => {
    try {
        let level = req.query.level;
        level = LEVEL_MAP[level] || level;
        if (!level) return res.status(400).json({ message: 'Level is required' });
        const word = await translationRepository.getWordToSpellingByLevel(level);
        if (!word) return res.status(404).json({ message: 'No words found for this level' });
        res.json({
            POS: word.POS,
            sourceText: word.sourceText,
            translatedText: word.translatedText,
            image: word.image,
            level: word.level
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};