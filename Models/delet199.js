const mongoose = require('mongoose');
const Vocabulary = require('./vocabulary'); // ודאי שהשם תואם לקובץ המודל שלך

const MONGODB_URI = 'mongodb://localhost:27017/EnglishFix';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('✔️ מחובר ל-MongoDB'))
  .catch(err => {
    console.error('❌ שגיאה בהתחברות:', err);
    process.exit(1);
  });

async function deleteLatest199() {
  try {
    // מצא את 199 הרשומות האחרונות לפי סדר הירידה של _id
    const latestDocs = await Vocabulary.find({})
      .sort({ _id: -1 })
      .limit(199);

    const idsToDelete = latestDocs.map(doc => doc._id);

    if (idsToDelete.length === 0) {
      console.log('ℹ️ אין רשומות למחיקה');
      return;
    }

    // מחק את הרשומות
    const result = await Vocabulary.deleteMany({ _id: { $in: idsToDelete } });

    console.log(`🗑️ נמחקו ${result.deletedCount} רשומות`);
  } catch (err) {
    console.error('❌ שגיאה במהלך המחיקה:', err);
  } finally {
    mongoose.disconnect();
  }
}

deleteLatest199();