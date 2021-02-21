//getting all the stuff to use mongoDB and mongoose which makes using MongoDB easier
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(cors());
app.use(express.json());

//set up database
require('dotenv').config();
const uri_key = process.env.MONGODB_URI;
mongoose.connect( uri_key, { useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

//create routes to our models
const usersRouter = require('./routes/users');
const journalsRouter = require('./routes/journals');

app.use('/journals', journalsRouter);
app.use('/users', usersRouter);

//port connection
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is up and running on port: ${port}`);
});