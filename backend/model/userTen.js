const mongoose = require("mongoose"); 

const userTen = new mongoose.Schema({
    username: String,
    typeDB: String
})

module.exports = userTen

