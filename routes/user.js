//1번
const express = require('express')
const router = express.Router()

const {
    users_create_user,
    users_post_login
} = require('../controllers/user')

//회원가입
router.post('/register', users_create_user)



//로그인
router.post('/login', users_post_login)



//이메일 체크 => password 암호화 => 데이터베이스 저장 이걸 하면됨!!

//2번
module.exports = router;