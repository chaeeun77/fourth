const express = require('express');
const router = express.Router();

//order(장바구니) data 불러오기
router.get('/', (req, res) => {
    res.json({
        message: 'order data 불러오기'
    })
})

//order data 생성하기
router.post('/', (req, res) => {
    res.json({
        message: 'order data 생성하기'
    })
})

//order data 업데이트하기
router.put('/', (req, res) => {
    res.json({
        message: 'order data 업데이트하기'
    })
})

//order data delte하기
router.delete('/', (req, res) => {
    res.json({
        message: 'order data delete하기'
    })
})

module.exports = router;