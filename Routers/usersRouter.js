const express = require("express");
const verifyJWT = require("../Middelwares/verifyJWT");
const router = express.Router();
const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  updateFailedWords,
  addWordToFavorites,
} = require("../Controllers/UsersController");

// סדר נכון: קודם נתיבים ספציפיים, אחר כך דינמיים
router.put('/add-favorite', verifyJWT, addWordToFavorites);
router.put('/failedWords', verifyJWT, updateFailedWords);
router.post('/', createUser);
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
module.exports = router;