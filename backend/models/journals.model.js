const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const journalSchema = new Schema({
    userid: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    date: { type: Date, //change back to date
        required: true
    },
    mood: { type: String,
        required: true
    },
    mood: { type: String,
        required: true
    },
}, {
    timestamps: true,
});

const Journal = mongoose.model('Journal', journalSchema);

module.exports = Journal;
