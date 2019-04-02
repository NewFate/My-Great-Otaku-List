'use strict';

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/GreatAnimeListAPI', { useNewUrlParser: true, useCreateIndex: true}, function(err, db){
	if(err){
		log("DEU RUIM");
		log(err);
	}else log("DEU BOM");
});

module.exports = {
	mongoose
}