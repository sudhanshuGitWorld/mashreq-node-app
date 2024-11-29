const express = require('express');

const connectDB = require('./db-config/database');
const app = express();

connectDB().then(() => {
    console.log('DB connection has successfully established')
    app.listen(8080, () => {
        console.log('Server is listening on 8080');
    })
}).catch((err) => {
    console.log('DB connection failed')
})
