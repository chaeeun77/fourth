const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// app.use((req, res) => {
//     res.json({
//         message: 'it works'
//     })
// })

const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders')

//database 연결
const dbaddress = "mongodb+srv://fourth:codms13579@cluster0.loeyr.mongodb.net/shoppingmall?retryWrites=true&w=majority"
const dboptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true
}

mongoose
    .connect(dbaddress, dboptions)
    .then(() => console.log("MongoDb connected"))
    .catch(err => console.log(err.message))

//middle wear 설정
app.use(morgan('dev'));

//body-parser에 대한 middle wear 설정
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

//router
app.use('/products', productRoutes)
app.use('/orders', orderRoutes)

const PORT = 3000;

app.listen(PORT, console.log('server start'))
