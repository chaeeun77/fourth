const userModel = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')



exports.users_create_user = (req, res) => {
    //email 중복체크 => password 암호화 => database 저장 (이걸 역으로 진행한다.)

    const { email, password, username } = req.body;

    userModel
        .findOne({email})
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
                            username, email, password: hash
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
};

exports.users_post_login = (req, res) => {
    //이메일 유무 체크 -> 패스워드 매칭 -> return jwt

    const { email, password, username } = req.body;

    userModel
        .findOne({email})
        .then(user => {
            if(!user) {
                return res.json({
                    message: "이메일이 존재하지 않습니다."
                })
            } else {
                bcrypt.compare(password, user.password, (err, result) => {
                    if(err || result === false){
                        return res.json({
                            success: result,
                            message: "password incorrect"
                        })
                    } else {
                        // res.json(user)
                        const token = jwt.sign(
                            {email: user.email, id: user._id},
                            "secret",
                            {expiresIn: "1d"} //1d : 하루, 1m : 한달
                        )
                        res.json({
                            success: result,
                            token: token
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
};