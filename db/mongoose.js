'use strict';

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/GreatAnimeListAPI', { useNewUrlParser: true, useCreateIndex: true});

module.exports = {
	mongoose
}