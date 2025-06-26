const mongoose = require('mongoose');
const { PART_OF_SPEECH } = require('../constants');

const translationSchema = new mongoose.Schema({
    sourceText: { type: String, required: true },
    translatedText: { type: [String], required: true },
    sourceLanguage: { type: String, required: true },//For expansion
    targetLanguage: { type: String, required: true },//For expansion
    level: { type: String , required: true }, // previously added
    band: { type: String , required: true }, // new field
    category: { type: String }, // new field
    record: { type: String  }, // new field
    POS: { 
        type: String, 
        required: true, 
        enum: PART_OF_SPEECH,
    }, // Part of Speech as enum    exampleSentence: { type: String }, // new field
    image: { type: String }, // URL or path to image
    tags: { type: [String] }, // array of tags
    }, { timestamps: true }); // Automatically manage createdAt and updatedAt fields


module.exports = mongoose.model('Translation', translationSchema);