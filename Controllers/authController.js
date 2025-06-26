const Users = require('../Models/Users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer'); // ✅ ייבוא nodemailer

// ✅ פונקציית שליחת מייל ברישום


const sendWelcomeEmail = async (email, name) => {
    try {

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
            tls: {
                rejectUnauthorized: false, // Allow self-signed certificates
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Welcome to Our App!',
            text: `Hi ${name},\n\nThank you for registering! We're happy you joined englishfix champions.\n\nBest,\nThe Team`,
        };

        await transporter.sendMail(mailOptions);
        console.log(`Welcome email sent to ${email}`);
    } catch (error) {
        console.error('Error sending welcome email:', error.message);
    }
};

const login = async (req, res) => {

    const { fullname, password } = req.body;
    const foundUser = await Users.findOne({ fullname }).lean();
    if (!foundUser) {
        console.log('LOGIN: user not found');
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const match = await bcrypt.compare(password, foundUser.password);
    if (!match) {
        console.log('LOGIN: password mismatch');
        return res.status(401).json({ message: 'Unauthorized' });
    }

    console.log('LOGIN: user authenticated, building response');
    const userInfo = {
        _id: foundUser._id,
        fullname: foundUser.fullname,
        email: foundUser.email,
        level: foundUser.level,
        subscriptionStatuse: foundUser.subscriptionStatuse || 'user'
    };

    const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET);
    let userType = 'user';
    if (foundUser.subscriptionStatuse === 'admin') {
        userType = 'admin';
    }
    console.log('LOGIN: sending response', { accessToken, user: userInfo, userType });
    res.json({ accessToken, user: userInfo, userType });
};

const register = async (req, res) => {

    const { email, fullname, password, subscriptionStatuse } = req.body;
    const duplicate = await Users.findOne({ fullname }).lean();
    if (duplicate) {
        return res.status(409).json({ message: "Duplicate fullname" });
    }

    const hashedPwd = await bcrypt.hash(password, 10);
    // הוספת subscriptionStatuse לאובייקט המשתמש
    const userObject = { email, fullname, password: hashedPwd, subscriptionStatuse };
    const user = await Users.create(userObject);

    if (user) {
        await sendWelcomeEmail(email, fullname);
        // מחזיר את המשתמש החדש כולל subscriptionStatuse
        return res.status(201).json({
            message: `New user ${user.fullname} created`,
            user: {
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
                level: user.level,
                subscriptionStatuse: user.subscriptionStatuse
            }
        });
    } else {
        return res.status(400).json({ message: 'Invalid user received' });
    }
};

module.exports = { login, register };
