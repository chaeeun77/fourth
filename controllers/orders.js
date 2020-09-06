const orderModel = require('../models/orders')


exports.orders_get_all = (req, res) => {
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
};

exports.orders_create_order = (req, res) => {

    const { product, quantity } = req.body

    productModel
        .findById(req.body.productId)
        .then(product => {
            const newOrder = new orderModel({
                product, quantity
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
};

exports.orders_get_product = (req, res) => {
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
};

exports.orders_update_order = (req, res) => {
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
};

exports.orders_delete_order = (req, res) => {
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
};