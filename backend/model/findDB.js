const mongoose = require("mongoose"); 

const db_list = new mongoose.Schema({
    name: String
})

module.exports = db_list

