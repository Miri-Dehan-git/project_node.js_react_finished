const mongoose = require('mongoose');
const fs = require('fs');
const ReadingCompetition = require('./readingCompetition');

mongoose.connect('mongodb://localhost:27017/EnglishFix');

// קבלת נתיב הקובץ והרמה מהפקודה או ברירת מחדל
const filePath = process.argv[2] || 'קטע הבנה.txt';
const level = process.argv[3] || 'Basic';

const fileContent = fs.readFileSync(filePath, 'utf8');

// חילוץ טקסט הקטע
const passageMatch = fileContent.match(/קטע הבנה:\s*([\s\S]*?)שאלות:/);
const passageText = passageMatch ? passageMatch[1].trim() : '';

if (!passageText) {
  console.error('לא נמצא טקסט קטע הבנה!');
  process.exit(1);
}

// חילוץ השאלות
const questionsSection = fileContent.split('שאלות:')[1];
const questionBlocks = questionsSection
  .split(/\n\s*\n\s*\n/) // מפריד בין שאלות (שלוש ירידות שורה)
  .map(q => q.trim())
  .filter(Boolean);

const questions = [];

questionBlocks.forEach(block => {
  // חילוץ שאלה
  const lines = block.split('\n').map(l => l.trim()).filter(Boolean);

  // מציאת שורת התשובה הנכונה
  const answerLineIdx = lines.findIndex(line => /^תשוב[הות]/.test(line));
  if (answerLineIdx === -1) return; // דילוג אם אין תשובה

  // שאלה: כל השורות עד האופציות
  let questionText = '';
  let options = [];

  // חיפוש שורת השאלה (השורה הראשונה שאינה ריקה ואינה אופציה)
  let i = 0;
  while (i < answerLineIdx && (lines[i] === '' || lines[i].startsWith('COMPLETE') || lines[i].startsWith('PUT'))) i++;
  questionText = lines[i] || '';

  // חיפוש האופציות (כל השורות אחרי השאלה ועד שורת התשובה)
  options = [];
  for (let j = i + 1; j < answerLineIdx; j++) {
    if (lines[j] && !lines[j].startsWith('COMPLETE') && !lines[j].startsWith('PUT')) {
      options.push(lines[j]);
    }
  }

  // חילוץ תשובה נכונה (תומך גם ב"תשובות 3 ו-6 נכונות")
  const answerLine = lines[answerLineIdx];
  let correctAnswers = [];
  const matchMulti = answerLine.match(/תשובות?\s*([\d ו-]+)\s*נכונות?/);
  if (matchMulti) {
    // לדוג' "תשובות 3 ו-6 נכונות"
    correctAnswers = matchMulti[1]
      .split(/[ ו-]+/)
      .map(num => parseInt(num))
      .filter(n => !isNaN(n))
      .map(idx => options[idx - 1]);
  } else {
    // לדוג' "תשובה 2 נכונה"
    const matchSingle = answerLine.match(/תשובה\s*(\d+)\s*נכונה/);
    if (matchSingle) {
      correctAnswers = [options[parseInt(matchSingle[1]) - 1]];
    }
  }

  if (questionText && options.length && correctAnswers.length) {
    questions.push({
      questionText,
      options,
      correctAnswer: correctAnswers // תמיד מערך!
    });
  }
});

// יצירת המסמך במסד הנתונים
(async () => {
  try {
    const doc = new ReadingCompetition({
      passageText,
      questions,
      level // כאן נכנסת הרמה שנבחרה!
    });
    await doc.save();
    console.log('Reading competition imported successfully!');
  } catch (err) {
    console.error('Error importing reading competition:', err);
  } finally {
    mongoose.connection.close();
  }
})();