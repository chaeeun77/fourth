const mongoose = require('mongoose');

//database 연결
const dboptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true
}

mongoose
    .connect(process.env.MONGO_URI, dboptions)
    .then(() => console.log("MongoDb connected"))
    .catch(err => console.log(err.message))