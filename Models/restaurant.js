const mongoose = require("mongoose");
const Schema = mongoose.Schema 


const restaurantSchema = new Schema({
    _id : mongoose.Schema.Types.ObjectId,
    R_ID: {type: Number, unique: true},
    R_name: {type: String},
    R_loc : {type: String},
    R_About :{type: String},
    R_History:{type: String},
    R_logo: {data: Buffer, contentType: String},
    User_ID: { type: mongoose.Schema.ObjectId, ref: 'User', required: false },

})

const restaurant = mongoose.model('restaurant',restaurantSchema)
module.exports = restaurant