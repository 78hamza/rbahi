const mongoose = require('mongoose');


const userDataSchema = new mongoose.Schema (
    {
        userId: {
            type: Number, 
            unique: true,
            required: true,
        },
        dataset : {
            type: Object,
            required: true,
        },
        added_at : {
            type: Date,
            required: false
        }
    }
);


module.exports = userDataSchema;



