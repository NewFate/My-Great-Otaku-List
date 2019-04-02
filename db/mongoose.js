'use strict';

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useCreateIndex: true});

module.exports = {
	mongoose
}