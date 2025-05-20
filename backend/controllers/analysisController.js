const callPython = require('../services/callPython');
const fs = require('fs');
const path = require('path');
exports.analyzeFile = async (req, res) => {
    try {
        const filePath = path.join(__dirname, '..',req.file.path);
        console.log('file path  is: ', filePath);

        const result = await callPython(filePath);

        fs.unlinkSync(filePath); // delete the file after processing

        res.json({ result });
    } catch (err) {
        console.error('analysis error', err);
        res.status(500).json({ error: "Analysis failed" });
    }
};