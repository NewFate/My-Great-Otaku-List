'use strict';

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/GreatAnimeListAPI', { useNewUrlParser: true, useCreateIndex: true}).catch(function (reason) {
    console.log('Unable to connect to the mongodb instance. Error: ', reason);
});
module.exports = {
	mongoose
}