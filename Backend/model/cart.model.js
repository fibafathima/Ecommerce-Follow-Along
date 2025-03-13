const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "usercollections", 
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "productcollections", 
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
        default: 1
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 1
    },
});

const CartModel = mongoose.model('cart', cartSchema);

module.exports = {
    CartModel
};