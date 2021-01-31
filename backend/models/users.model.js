const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 5
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    emailAddress: {
        type: String,
        required: false
    },
    profilePicture: {
        type: String,
        required: false
    },
    personalityType: {
        type: String,
        required: true
    },
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;