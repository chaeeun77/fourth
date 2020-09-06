const productModel = require('../models/product')



exports.products_get_all = (req, res) => {
    productModel
        .find()
        .then(results => {
            // res.json({
            //     count: results.length,
            //     products: results
            // })
            const response = {
                count: results.length,
                products: results.map(result => {
                    return{
                        id: result._id,
                        name: result.name,
                        price: result.price,
                        request: {
                            type: "GET",
                            url: "http://localhost:3000/products/" + result._id
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
    //     message: 'product data 불러오기'
    // })
};

exports.products_create_product = (req, res) => {
    const newProduct = new productModel({
        name: req.body.productname,
        price : req.body.productprice
    })

    newProduct
        .save()
        .then(doc => {
            res.json({
                message: "saved data",
                productInfo: {
                    id: doc._id,
                    name: doc.name,
                    price: doc.price,
                    request: {
                        type: "GET",
                        url: "http://localhost:3000/products/" + doc._id
                    }
                }
            })
        })
        .catch(err => {
            res.json({
                message: err.message
            })
        })
    // const product = {
    //     name: req.body.productname,
    //     price: req.body.productprice
    // }
    // res.json({
    //     message: 'product data 생성하기',
    //     createdProduct: product //우리가 입력한 값을 보여주겠다.
    // })
};

exports.products_get_product = (req, res) => {
    const id = req.params.productId

    productModel
        .findById(id)
        .then(doc => {
            res.json({
                message: "get product data from " + id,
                productInfo : {
                    id: doc._id,
                    name: doc.name,
                    price: doc.price,
                    request: {
                        type: "GET",
                        url: "http://localhost:3000/products/total"
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

exports.products_update_product = (req, res) => {
    const id = req.params.productId
    const updateOps = {};
    for(const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }

    productModel
        .findByIdAndUpdate(id, {$set: updateOps})
        .then(result => {
            console.log("result is ", result)
            res.json({
                message: "updated product at " + id,
                request: {
                    type: "GET",
                    url: "http://localhost:3000/products" + id
                }
            })
        })
        .catch(err => {
            res.json({
                message: err.message
            })
        })
};



exports.products_delete_product = (req, res) => {
    const id = req.params.productId

    productModel
        .findByIdAndDelete(id)
        .then(result => {
            res.json({
                message: "deleted product at " + id,
                request: {
                    type: "GET",
                    url: "http://localhost:3000/products/total"
                }
            })
        })
        .catch(err => {
            res.json({
                message: err.message
            })
        })
};