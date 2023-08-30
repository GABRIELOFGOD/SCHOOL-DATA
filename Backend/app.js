// ======= Calling All Requirements ======= //
const express = require('express');
const dbConnect = require('./config/schoolDB');
const cors = require('cors')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')

const mngRouter = require('./routes/mngRoute');
const staffRouter = require('./routes/staffRoute');
const stuRouter = require('./routes/studentRoute');

require('dotenv').config();

const PORT = process.env.PORT || 7000
const app = express()

// ====== Cross Origin Access ======= //
app.use(cors({
    origin: 'http://localhost:5173',
    credentials:true
}))

// ====== DataBase Connection ====== //
dbConnect();

// ====== server settings ===== //
app.use(express.json())
app.use(cookieParser())

// ======== Routes ======== //

app.use('/api/student', stuRouter)
app.use('/api/staff', staffRouter)
app.use('/api', mngRouter)

// ======== PORT Listening ======== //
app.listen(PORT, console.log(`server listening at ${PORT}`))
