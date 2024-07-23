const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
    name: { type: String, required: true },
    nationality: { type: String, required: true },
    date: { type: Number, required: true }
});

module.exports = mongoose.model('List', listSchema);
