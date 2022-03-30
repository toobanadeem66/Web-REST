const mongoose = require("mongoose");


const restaurantSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    R_ID: {type: Number, unique: true},
    R_name: {type: String},
    R_loc : {type: String},
    R_logo: {data: Buffer, contentType: String},
    User_ID: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },

})

const restaurant = mongoose.model('restaurant',restaurantSchema)
module.exports = restaurant