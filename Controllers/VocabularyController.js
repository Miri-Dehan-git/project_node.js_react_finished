const Vocabulary =require("../Models/vocabulary")
const getAllWords = async (req, res) => {
  try {
    const words = await Vocabulary.find().lean();
    res.json(words);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const findByTextField = async (req, res) => {
    const {text} = req.body;
    try {
        const vocabularies = await Vocabulary.find({ englishName: text });
        res.status(200).json(vocabularies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const findBylevel = async (req, res) => {
    const {level} = req.body;
    try {
        const vocabularies = await Vocabulary.find({ englishName: text });
        res.status(200).json(vocabularies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getVocabularyById = async (req, res) => {
    try {
        const vocabulary = await Vocabulary.findById(req.params.id);
        if (!vocabulary) {
            return res.status(404).json({ message: "Vocabulary not found" });
        }
        res.status(200).json(vocabulary);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createVocabulary = async (req, res) => {
    try {
        const newVocabulary = new Vocabulary(req.body);
        const savedVocabulary = await newVocabulary.save();
        res.status(201).json(savedVocabulary);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


const updateVocabulary = async (req, res) => {
    try {
        const updatedVocabulary = await Vocabulary.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedVocabulary) {
            return res.status(404).json({ message: "Vocabulary not found" });
        }
        res.status(200).json(updatedVocabulary);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteVocabulary = async (req, res) => {
    try {
        const deletedVocabulary = await Vocabulary.findByIdAndDelete(req.params.id);
        if (!deletedVocabulary) {
            return res.status(404).json({ message: "Vocabulary not found" });
        }
        res.status(200).json({ message: "Vocabulary deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getVocabularyByLevel = async (req, res) => {
    const { level } = req.query; // מקבלים את הרמה מהבקשה
    try {
        // שליפת 20 מילים אקראיות לפי הרמה
        const words = await Vocabulary.aggregate([
            { $match: { level } }, // מסנן לפי הרמה
            { $sample: { size: 20 } } // בוחר 20 מילים אקראיות
        ]);
        res.json(words);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching words', error });
    }
}
const searchWords = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.json([]);
    // חיפוש לא רגיש לרישיות באנגלית או בעברית
    const regex = new RegExp(q, 'i');
    const words = await Vocabulary.find({
      $or: [
        { englishName: regex },
        { hebrowName: regex }
      ]
    });
    res.json(words);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Batch fetch vocabulary by array of IDs
const getVocabularyByIds = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: 'No IDs provided' });
    }
    // Convert to ObjectId if needed
    const objectIds = ids.map(id => (typeof id === 'string' ? id : String(id)));
    const words = await Vocabulary.find({ _id: { $in: objectIds } });
    res.status(200).json(words);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
    searchWords,
    getAllWords,
    getVocabularyById,
    createVocabulary,
    updateVocabulary,
    deleteVocabulary,
    findByTextField,
    getVocabularyByLevel,
    getVocabularyByIds, // <-- add export
};