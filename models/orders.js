//1번
const mongoose = require('mongoose');

//2번
const orderSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
        required: true
    },
    quantity: {
        type: Number,
        default: 1
    }
})

//3번
module.exports = mongoose.model('order', orderSchema)