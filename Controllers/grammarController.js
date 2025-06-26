// exports.getGrammarTopics = (req, res) => {
//     res.json([
//         { title: "הווה פשוט (Present Simple)", url: "/grammar-pdfs/present-simple.pdf" },
//         { title: "הווה ממושך (Present Progressive)", url: "/grammar-pdfs/present-progressive.pdf" },
//         { title: "עבר פשוט (Past Simple)", url: "/grammar-pdfs/past-simple.pdf" },
//         { title: "עבר ממושך (Past Progressive)", url: "/grammar-pdfs/past-progressive.pdf" },
//         { title: "עבר מושלם פשוט (Past Perfect Simple)", url: "/grammar-pdfs/past-perfect-simple.pdf" },
//         { title: "עתיד פשוט (Future Simple)", url: "/grammar-pdfs/future-simple.pdf" },
//         { title: "עתיד קרוב (Future Going To)", url: "/grammar-pdfs/future-going-to.pdf" },
//         { title: "Modals", url: "/grammar-pdfs/modals.pdf" },
//         { title: "חלקי דיבור (Speech Parts)", url: "/grammar-pdfs/speech-parts.pdf" },
//         { title: "פעלי מצב (Stative Verbs)", url: "/grammar-pdfs/stative-verbs.pdf" }
//     ]);
// };

exports.getGrammarTopics = (req, res) => {
    const serverUrl = process.env.SERVER_URL || `http://${req.headers.host}`;
    res.json([
        { title: "הווה פשוט (Present Simple)", url: `${serverUrl}/grammar-pdfs/present-simple.pdf` },
        { title: "הווה ממושך (Present Progressive)", url: `${serverUrl}/grammar-pdfs/present-progressive.pdf` },
        { title: "עבר פשוט (Past Simple)", url: `${serverUrl}/grammar-pdfs/past-simple.pdf` },
        { title: "עבר ממושך (Past Progressive)", url: `${serverUrl}/grammar-pdfs/past-progressive.pdf` },
        { title: "עבר מושלם פשוט (Past Perfect Simple)", url: `${serverUrl}/grammar-pdfs/past-perfect-simple.pdf` },
        { title: "עתיד פשוט (Future Simple)", url: `${serverUrl}/grammar-pdfs/future-simple.pdf` },
        { title: "עתיד קרוב (Future Going To)", url: `${serverUrl}/grammar-pdfs/future-going-to.pdf` },
        { title: "Modals", url: `${serverUrl}/grammar-pdfs/modals.pdf` },
        { title: "חלקי דיבור (Speech Parts)", url: `${serverUrl}/grammar-pdfs/speech-parts.pdf` },
        { title: "פעלי מצב (Stative Verbs)", url: `${serverUrl}/grammar-pdfs/stative-verbs.pdf` }
    ]);
};

const fs = require('fs');
const path = require('path');

// העלאת קובץ דקדוק
exports.uploadGrammarPdf = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded or invalid file type' });
    }
    const serverUrl = process.env.SERVER_URL || `http://${req.headers.host}`;
    res.status(201).json({
        message: 'File uploaded successfully',
        fileName: req.file.filename,
        url: `${serverUrl}/grammar-pdfs/${req.file.filename}`
    });
};

// מחיקת קובץ דקדוק
exports.deleteGrammarPdf = (req, res) => {
    const fileName = req.params.fileName;
    if (!fileName) {
        return res.status(400).json({ message: 'File name is required' });
    }
    const filePath = path.join(process.cwd(), 'Public', 'grammar-pdfs', fileName);
    fs.unlink(filePath, (err) => {
        if (err) {
            return res.status(404).json({ message: 'File not found or could not be deleted' });
        }
        res.json({ message: 'File deleted successfully' });
    });
};