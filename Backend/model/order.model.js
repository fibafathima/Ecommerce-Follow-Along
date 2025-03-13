const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usercollections', 
        required: true,
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'productcollections',  
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    totalPrice: {
        type: Number,
        required: true
    },
    address: {
        street: { type: String, required: false},
        city: { type: String, required: true },
        state: { type: String, required: false },
        zipCode: { type: String, required: true }
    },
    status: {
        type: String,
        enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Pending'
    },
    orderDate: {
        type: Date,
        default: Date.now
    },
    cancelled: {
        type: Boolean,
        default: false
    }
});

const OrderModel = mongoose.model('orders', orderSchema);

module.exports = { OrderModel };