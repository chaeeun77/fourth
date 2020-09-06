const express = require('express');
const router = express.Router();
const orderModel = require('../models/orders')
const productModel = require('../models/product')

//order(장바구니) data 불러오기
router.get('/total', (req, res) => {
    orderModel
        .find()
        .populate('product', ['name', 'price'])
        .then(results => {
            const response = {
                count: results.length,
                orders: results.map(result => {
                    return{
                        id: result._id,
                        product: result.product,
                        quantity: result.quantity,
                        request: {
                            type: 'GET',
                            url: "http://localhost:3000/orders/" + result._id
                        }
                    }
                })
            }
            res.json(response)
        })
        .catch(err => {
            res.json({
                message: err.message
            })
        })
    // res.json({
    //     message: 'order data 불러오기'
    // })
})

//order detail get API
router.get('/:orderId', (req, res) => {
    const id = req.params.orderId

    orderModel
        .findById(id)
        .populate('product', ['name', 'price'])
        .then(doc => {
            res.json({
                message: "get order data from " + id,
                orderInfo: {
                    id: doc._id,
                    product: doc.product,
                    quantity: doc.quantity,
                    request: {
                        type: "GET",
                        url: "http://localhost:3000/orders/total"
                    }
                }
            })
        })
        .catch(err => {
            res.json({
                message: err.message
            })
        })
})

//order data 생성하기
router.post('/', (req, res) => {

    productModel
        .findById(req.body.productId)
        .then(product => {
            const newOrder = new orderModel({
                product: req.body.productId,
                quantity: req.body.qty
            })

            newOrder
                .save()
                .then(doc => {
                    res.json({
                        message: "saved order",
                        productInfo: {
                            id: doc._id,
                            product: doc.product,
                            quantity: doc.quantity,
                            request: {
                                type: "GET",
                                url: "http://localhost:3000/orders/" + doc._id
                            }
                        }
                    })
                })
                .catch(err=> {
                    res.json({
                        message: err.message
                    })
                })
        })
        .catch(err => {
            res.json({
                message: "product not found"
            })
        })
})

//order data 업데이트하기
router.put('/:productId', (req, res) => {
    const id = req.params.productId
    const updateOps = {};
    for(const ops of req.body) {
        updateOps[ops.propName] = ops.value
    }

    orderModel
        .findByIdAndUpdate(id, {$set: updateOps})
        .then(result => {
            res.json({
                message: "updated order at " + id,
                request: {
                    type: "GET",
                    url: "http://localhost:3000/orders" + id
                }
            })
        })
        .catch(err => {
            res.json({
                message: err.message
            })
        })
    // res.json({
    //     message: 'order data 업데이트하기'
    // })
})

//order data delte하기
router.delete('/:productId', (req, res) => {
    const id = req.params.productId

    orderModel
        .findByIdAndDelete(id)
        .then(result => {
            res.json({
                message: "deleted order at " + id,
                request: {
                    type: "GET",
                    url: "http://localhost:3000/orders/total"
                }
            })
        })
        .catch(err => {
            res.json({
                message: err.message
            })
        })
    // res.json({
    //     message: 'order data delete하기'
    // })
})

module.exports = router;