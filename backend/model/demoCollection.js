const mongoose = require("mongoose"); 

const demo_collection = new mongoose.Schema({
    name: String,
    text_in: String,
    date: { type: Date, default: Date.now },
})

module.exports = demo_collection

