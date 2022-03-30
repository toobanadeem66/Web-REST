const mongoose = require("mongoose");


const statusSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    Status_name: {type: String},
    R_ID: {type: Number}
})

const status = mongoose.model('status',statusSchema)
module.exports = status