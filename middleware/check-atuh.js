const jwt = require('jsonwebtoken')

//next가 있어야 넘어간다. try에서 err가 나면 catch로 가는거고 try에서 , while문보다
module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(" ")[1]; //html에서 헤더
        const decoded = jwt.verify(token, "secret") //token을 검증하는 것이다.
        req.userData = decoded;
        next();
    } catch (error) {
        return res.json({
            message: 'Auth failed'
        }) //catch에서 어떤것을 잡을거냐 error로 상수화시킴.
    }

}