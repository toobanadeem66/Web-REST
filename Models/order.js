const mongoose =require('mongoose');

const orderSchema = mongoose.Schema({
     Order_ID: mongoose.Schema.Types.ObjectId,
     R_ID: { type: Number, ref: 'restaurant', required: true },
     User_ID: { type: String, ref: 'User', required: true },
     Creation_time:{ type: String, required: true },
     Delivered_time: { type: String},
     Total_Price: { type: Number, required: true},
     isPaid: { type: Boolean },
     Tax: {type: Number, required: true},
     isActive: {type: Boolean, required: true},
     Order_Status: {type: String, enum: ["delivered", "cancelled", "prepared", "out for delivery"], required: true}
});


const Order = mongoose.model('order',orderSchema)
module.exports = Order