const Translation = require('../Models/translationModel');
const {LEVELS} = require('../constants');
exports.findAllTranslations = async () => Translation.find();

exports.searchTranslations = async (query) => {
    // Adjust the fields as needed (e.g., sourceText, translatedText)
    return Translation.find({
        $or: [
            { sourceText: { $regex: query, $options: 'i' } },
            { translatedText: { $regex: query, $options: 'i' } }
        ]
    });
};


exports.findAllTranslations = async (page = 1, limit = 10) => {
    const skip = (page - 1) * limit;
    const [results, total] = await Promise.all([
        Translation.find().skip(skip).limit(limit),
        Translation.countDocuments()
    ]);
    return {
        results,
        total,
        page,
        pages: Math.ceil(total / limit)
    };
};


exports.findTranslationById = async (id) => Translation.findById(id);

exports.createTranslation = async (data) => {
    const translation = new Translation(data);
    return translation.save();
};

exports.updateTranslation = async (id, data) => 
    Translation.findByIdAndUpdate(id, data, { new: true });

exports.deleteTranslation = async (id) => 
    Translation.findByIdAndDelete(id);
exports.getWordToPronunciationByLevel=async (level, num) =>{
    console.log("getWordToPronunciationByLevel", level, num);
    const results = await Translation.aggregate([
        { $match: { level: level} },
        { $sample: { size: 1 } }
    ]);
    return results[0] || null;
}
exports.getWordToSpellingByLevel=async (level, num) =>{
    //שישלוף מטבלה מיוחדת לפי מספר סידורי
    const results = await Translation.aggregate([
        { $match: { level: level} },
        { $sample: { size: 1 } }
    ]);
    return results[0] || null;
}