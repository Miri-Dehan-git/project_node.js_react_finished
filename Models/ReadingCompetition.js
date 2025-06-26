const mongoose = require('mongoose');
const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: [{ type: String, required: true }] // מערך תשובות נכונות
});
const readingCompetitionSchema = new mongoose.Schema({
  passageText: { type: String, required: true }, // טקסט הקטע
  questions: [questionSchema], // מערך שאלות
  level: {
    type: String,
    enum: ['Basic', 'Intermediate', 'Good', 'Advanced', 'Excellent'],
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('ReadingCompetition', readingCompetitionSchema);