const mongoose = require("mongoose");
// const { MONGO_URI_DEMO } = process.env;




const connect =  (setHttp) => {
    return mongoose.createConnection(setHttp, {
        useNewUrlParser: true,
        // authSource: 'admin',
        // auth: { username: 'root', password: 'root' },
        // driverInfo: { name: 'Mongoose', version: '6.2.1' }
    })
}


module.exports = connect