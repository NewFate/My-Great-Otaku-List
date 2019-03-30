/* Great Anime List server.js */
'use strict';
const log = console.log;

const express = require('express')
const bodyParser = require('body-parser')
const { ObjectID } = require('mongodb')

// Mongoose
const { mongoose } = require('./db/mongoose');
const { Anime } = require('./models/Anime')

// Express
const port = process.env.PORT || 3000
const app = express();
app.use(bodyParser.json());






app.listen(port, () => {
	log(`Listening on port ${port}...`)
});