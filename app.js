const express = require('express');
const path = require('path');
const cors = require('cors');
const poll = require('./routes/poll')
const dotenv = require('dotenv')

dotenv.config({ path: 'config.env'})
require('./config/db');


const app = express();
const PORT = process.env.PORT;

// setting public folder
app.use(express.static(path.join(__dirname, 'public')))

// Body Parser middleware
app.use(express.urlencoded({extended: false}))
app.use(express.json())

// Enable Cors
app.use(cors())

// requests in '/poll' will go in the poll.js file
app.use('/poll', poll)

// starting server
app.listen(PORT, ()=>{
    console.log(`The server is up in ${process.env.NODE_ENV} mode on port ${PORT}`)
})
