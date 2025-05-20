const callPython = require('../services/callPython');
const fs = require('fs');

exports.analyzeFile = async (req, res) => {
    try {
        const filePath = req.file.path;
        const result = await callPython(filePath);
        fs.unlinkSync(filePath);
        res.json({ result });
    } catch (err) {
        console.error('analysis error', err);
        res.status(500).json({ error: "Analysis failed" });
    }
};