require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/dbConnect");
const corsOptions = require("./config/corsOptions");
const grammarRoutes = require('./Routers/grammarRoutes');
const translationRoutes = require('./Routers/translationRoutes');
const PORT = process.env.PORT || 9000;
const app = express();
const verifyJWT=require("./Middelwares/verifyJWT")
const readingCompetitionRouter = require('./Routers/readingCompetitionRouter');
const adminRouter = require('./Routers/adminRouter');
const paymentRoutes =require('./Routers/paymentRoutes');


connectDB();
mongoose.connection.once("open", () => {
  console.log(" Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

mongoose.connection.on("error", (err) => {
  console.error(" MongoDB connection error:", err);
});

app.use(express.json());             
app.use(cors(corsOptions));  

// הוספת קבצים סטטיים מ-server/uploads
app.use('/uploads', express.static(path.join(__dirname, 'server/uploads')));
// הוספת קבצים סטטיים מ-Public/grammar-pdfs
app.use('/grammar-pdfs', express.static(path.join(process.cwd(), 'Public', 'grammar-pdfs')));

app.use('/api/admin', adminRouter);
app.use("/api/auth", require("./Routers/authRoutes"))
app.use("/api/users",require("./Routers/usersRouter"))
app.use('/api/translations', translationRoutes);
app.use("/api/vocabulary", require("./Routers/vocabularyRouter"))
app.use('/api/reading-competitions', readingCompetitionRouter);
app.use('/api/grammar', grammarRoutes);
app.use('/api/payments', paymentRoutes);


app.get("/", (req, res) => {
  res.send("ברוך הבא לשרת לימוד האנגלית ENGLISHFIX !");
});