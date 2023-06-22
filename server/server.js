

require('dotenv').config()
const mongoose = require('mongoose')
const path = require('path')
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 8000;

app.use(cors());
app.use(bodyParser.json());

// ---------------------------------------------

mongoose.connect(process.env.MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB')
    app.listen(port, () => { console.log(`Server started on port ${port}`) })
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error)
  })

const animeRouter = require('./route/api')
app.use('/', animeRouter)

module.exports = app

// ---------------------------------------------

