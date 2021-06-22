require('dotenv').config();
const mongoose = require('mongoose');

// Map global promises
mongoose.Promise = global.Promise;


mongoose.connect(process.env.MONGO_URI , {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true,}).then(() => console.log('Mongodb Connected')).catch(error => console.log(error))