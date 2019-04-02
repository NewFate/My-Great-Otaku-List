'use strict';

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin:thisadmin@cluster0-svj3b.azure.mongodb.net/test?retryWrites=true' || 'mongodb://localhost:27017/GreatAnimeListAPI', { useNewUrlParser: true, useCreateIndex: true}).catch(function (reason) {
    console.log('Unable to connect to the mongodb instance. Error: ', reason);
});

module.exports = {
	mongoose
}

/*
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://thisguy:<thisguy123>@project1-svj3b.mongodb.net/test?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});


module.exports = {
	client
}*/
/*
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:thisadmin@cluster0-svj3b.azure.mongodb.net/test?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
	console.log(err);
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

module.exports = {
	MongoClient
}*/