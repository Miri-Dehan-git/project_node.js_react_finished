const Users=require('../Models/Users')
const createUser = async (req, res) => {
    const {email,fullname,subscriptionStatuse} = req.body   
    const user = await Users.create({email,fullname,subscriptionStatuse })
    if (user) {
    return res.status(201).json({ message: 'New user created' })
    } else {
    return res.status(400).json({ message: 'failed in the creation of this user' })}}
const getAllUsers = async (req, res) => {
    const users = await Users.find()
    if (users) {
        return res.status(200).json(users)
    } else {
        return res.status(400).json({ message: 'failed to get the users' })
    }
}
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Users.findById(id)
      .populate('failedWords')
      .populate('serchedWords')
      .exec();
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('שגיאה ב-getUserById:', error);
    res.status(500).json({ error: 'שגיאה פנימית בשרת.' });
  }
};
const updateFailedWords = async (req, res) => {
    console.log("updateFailedWords called");
    try {
        console.log("user", req.user._id);
        const userId = req.user._id;
        const failedWords = req.body.failedWords; // <-- כאן התיקון!

        if (!Array.isArray(failedWords)) {
          return res.status(400).json({ error: 'פורמט לא תקין. נדרש מערך של מילים.' });
        }

        // חילוץ רק את ה־_id של כל מילה
        const wordIds = failedWords.map(word => word._id);

        // עדכון: הוספת מילים ל־failedWords אם הן לא קיימות כבר
        const updatedUser = await Users.findByIdAndUpdate(
          userId,
          { $addToSet: { failedWords: { $each: wordIds } } }, // נמנע מכפילויות
          { new: true }
        );

        res.status(200).json({ message: 'המילים נשמרו בהצלחה.', failedWords: updatedUser.failedWords });
      } catch (error) {
        console.error('שגיאה בעת עדכון failedWords:', error);
        res.status(500).json({ error: 'שגיאה פנימית בשרת.' });
      }
};
const updateUser = async (req, res) => {
    try {
        const { id } = req.params; // קח את ה-id מהנתיב
        const { email, fullname, subscriptionStatuse, level } = req.body;
        const user = await Users.findById(id).exec();
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }
        if (email !== undefined) user.email = email;
        if (fullname !== undefined) user.fullname = fullname;
        if (subscriptionStatuse !== undefined) user.subscriptionStatuse = subscriptionStatuse;
        if (level !== undefined) user.level = level;
        const updatedUser = await user.save();
        res.json(updatedUser);
    } catch (error) {
        console.error('שגיאה בעת עדכון משתמש:', error);
        res.status(500).json({ error: 'שגיאה פנימית בשרת.' });
    }
};
const deleteUser = async (req, res) => {
 const {id} = req.params
 const user = await Users.findById(id).exec()
 if (!user) {
 return res.status(400).json({ message: 'user not found' })
 }
 const result = await user.deleteOne()
 const reply=`User '${result.fullname}' ID ${result._id} deleted`
 res.json(reply)
 
 }
 const addWordToFavorites = async (req, res) => {
  try {
    const userId = req.user._id || req.body.userId; // לפי איך שאת מזהה משתמש
    const { word } = req.body; // word הוא אובייקט מילה (או רק מחרוזת)
    if (!word) return res.status(400).json({ message: 'לא נשלחה מילה' });

    const user = await Users.findById(userId).exec();
    if (!user) return res.status(404).json({ message: 'User not found' });

    // ודא שהמילה לא קיימת כבר במועדפים
    const exists = user.personalWordsList.some(arr => arr.includes(word));
    if (!exists) {
      user.personalWordsList.push([word]);
      await user.save();
    }

    res.json({ message: 'המילה נוספה למועדפים', personalWordsList: user.personalWordsList });
  } catch (error) {
    console.error('שגיאה בהוספת מילה למועדפים:', error);
    res.status(500).json({ error: 'שגיאה פנימית בשרת.' });
  }
};
 module.exports={createUser,getAllUsers,getUserById,updateUser,deleteUser,updateFailedWords,addWordToFavorites}


