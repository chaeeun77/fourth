//1번
const express = require('express')
const router = express.Router()
const userModel = require('../models/user')
const bcrypt = require('bcryptjs')


//회원가입
router.post('/register', (req, res) => {
    //email 중복체크 => password 암호화 => database 저장 (이걸 역으로 진행한다.)
    userModel
        .findOne({email: req.body.useremail})
        .then(user => {
            if(user) {
                return res.json({
                    message: "이미 아이디가 존재합니다."
                })
            } else{
                bcrypt.hash(req.body.pw, 10, (err, hash) => {
                    if(err){
                        return res.json({
                            message: err.message
                        })
                    }
                    else {
                        const newUser = new userModel({
                            username: req.body.name,
                            email: req.body.useremail,
                            password: hash
                        })

                        newUser
                            .save()
                            .then(user => {
                                res.json({
                                    message: "saved data",
                                    userInfo: user
                                })
                            })
                            .catch(err => {
                                res.json({
                                    message: err.message
                                })
                            })
                    }
                })
            }
        })
        .catch(err => {
            res.json({
                message: err.message
            })
        })
})

//로그인
router.post('/login', (req, res) => {
    userModel
        .findOne({email: req.body.useremail})
        .then(user => {
            if(!user) {
                return res.json({
                    message: "이메일이 존재하지 않습니다."
                })
            } else {
                // return res.json({
                //     message: "success login",
                //     loginInfo: user
                // })
                bcrypt.compare(req.body.pw, user.password, (err, result) => {
                    if(err || result === false){
                        return res.json({
                            message: "password incorrect"
                        })
                    } else {
                        res.json(user)
                    }
                })

            }
        })
        .catch(err => {
            res.json({
                message: err.message
            })
        })
})

//이메일 체크 => password 암호화 => 데이터베이스 저장 이걸 하면됨!!

//2번
module.exports = router;