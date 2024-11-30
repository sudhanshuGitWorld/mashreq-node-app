const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const connectDB = require('./db-config/database');
const authRouter = require('./router/authRouter')

const app = express();

app.use(express.json());
app.use(cookieParser());

const corsConfiguration = {
    origin: 'http://localhost:3000',
    credentials: true
};

app.use(cors(corsConfiguration));
app.use('/', authRouter);



connectDB().then(() => {
    console.log('DB connection has successfully established')
    app.listen(8080, () => {
        console.log('Server is listening on 8080');
    })
}).catch((err) => {
    console.log('DB connection failed')
})
