const mongoose = require("mongoose");
const Schema = mongoose.Schema;
exports.DepartmentSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    HOD: {
        type: mongoose.Types.ObjectId,
        ref: "Teacher",
        default: undefined
    },
    teachers: [{
        type: mongoose.Types.ObjectId,
        ref: "Teacher"
    }],
    unVerifiedQualifications: [{
        type: mongoose.Types.ObjectId,
        ref: "Qualification"
    }]
})

