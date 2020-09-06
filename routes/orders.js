const express = require('express');
const router = express.Router();
const orderModel = require('../models/orders')
const productModel = require('../models/product')
const checkAuth = require('../middleware/check-atuh')

const {
    orders_get_all,
    orders_create_order,
    orders_get_product,
    orders_update_order,
    orders_delete_order
} = require('../controllers/orders')

//order(장바구니) data 불러오기
router.get('/total', checkAuth, orders_get_all)



//order detail get API
router.get('/:orderId', checkAuth, orders_get_product)



//order data 생성하기
router.post('/', checkAuth, orders_create_order)



//order data 업데이트하기
router.put('/:productId', checkAuth, orders_update_order)



//order data delte하기
router.delete('/:productId', checkAuth, orders_delete_order)



module.exports = router;