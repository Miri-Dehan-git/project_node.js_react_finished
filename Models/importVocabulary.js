const filePath = process.argv[2] || 'vocabulary.csv'; // אם לא נשלח קובץ, ישתמש ב-vocabulary.csv
const level = process.argv[3] || 'Basic'; // רמה שמתקבלת מהשרת
const band = process.argv[4] || 'band1'; // BAND שמתקבל מהשרת

const mongoose = require('mongoose');
const Vocabulary = require('./vocabulary'); // ודאי שהשם תואם לקובץ המודל שלך
const fs = require('fs');

mongoose.connect('mongodb://localhost:27017/EnglishFix');

// קריאת הקובץ
const lines = fs.readFileSync(filePath, 'utf8').split('\n');

const results = [];
for (let i = 0; i < lines.length; i++) {
  const row = lines[i].replace(/\r/g, '').split(',');

  // דילוג על שורות ריקות, שורות עם כותרת, שורות עם מספר בלבד
  if (
    row.length < 2 ||
    !row.some(cell => cell && cell.trim()) ||
    row[0].includes('vocabularies:') ||
    /^\d+$/.test(row[0].trim())
  ) {
    continue;
  }

  // עובר על כל זוג עמודות (אנגלית, עברית)
  for (let j = 0; j < row.length - 1; j += 2) {
    const englishName = row[j] && row[j].trim();
    const hebrowName = row[j + 1] && row[j + 1].trim();
    // דילוג על תאים ריקים או עמודות ריקות
    if (
      englishName &&
      hebrowName &&
      englishName.toLowerCase() !== 'nan' &&
      hebrowName.toLowerCase() !== 'nan'
    ) {
      results.push({
        englishName,
        hebrowName,
        level, // כאן נכנסת הרמה שנבחרה
        band   // כאן נכנס ה-BAND שנבחר
      });
    }
  }
}

// דיבאג
console.log('Total words to import:', results.length);
if (results.length > 0) {
  console.log('First 5 words:', results.slice(0, 5));
} else {
  console.error('No words found to import! בדקי את מבנה הקובץ או את הלולאה');
}

(async () => {
  try {
    if (results.length === 0) {
      throw new Error('No words to import!');
    }
    await Vocabulary.insertMany(results);
    console.log('Vocabulary imported successfully!');
  } catch (err) {
    console.error('Error importing vocabulary:', err);
  } finally {
    mongoose.connection.close();
  }
})();