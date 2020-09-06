const express = require('express');
const router = express.Router();
const checkAuth =  require('../middleware/check-atuh')

const {
    products_get_all,
    products_create_product,
    products_get_product,
    products_update_product,
    products_delete_product
} = require('../controllers/products')


//product data 불러오기
router.get('/total', products_get_all)



//detail product get API
router.get('/:productId', products_get_product)



//product data 생성하기, 로그인을 해야 제품을 등록할 수 있다.
router.post('/register', checkAuth, products_create_product)



//product data 업데이트하기
router.put('/:productId', checkAuth, products_update_product)




//product data delete하기
router.delete('/:productId', checkAuth, products_delete_product)




module.exports = router;