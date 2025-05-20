const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');


module.exports = async function callPython(filePath) {
    const form = new FormData();
    form.append('file', fs.createReadStream(filePath));

    const response = await axios.post('http://localhost:7071/analyze', form, {
        headers: form.getHeaders(),
    })

    return response.data;
};   
