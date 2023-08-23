const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;
EventSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    images: [{
        path: {
            type: String,
            require: true
        }
    }],
    department: {
        type: mongoose.Types.ObjectId,
        ref: "Department"
    },
    location: { type: String },

    attendence: {
        type: Number,
        required: true,
    },
    notableGuests: [{
        type: String,
    }]
})




module.exports = { EventSchema }