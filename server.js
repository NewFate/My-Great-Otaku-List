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



// POST one anime
app.post('/anime', (req, res) =>{
	// Creating a new anime to be inserted
	



	const anime = new Anime({
		name: req.body.name,
		description: req.body.description,
   		imageURL: req.body.imageURL,
    	averageScore: 0,
    	reviews: []
	});
	// CHECK IF THIS ANIME EXISTS ALREADY	////////////////////////
	// Save anime to the database
	anime.save().then((anime) => {
		res.send(anime);
	}, (error) =>{
		res.status(400).send(error); // Bad request
	})
})

// GET all animes
app.get('/anime', (req, res) =>{

	Anime.find().then((animes) =>{
		if(!animes){
			res.status(404).send();
		}else{
			res.send(animes);
		}
	}).catch((error) => {
		res.status(404).send();
	})
})

// GET one anime, based on name
app.get('/anime/:name', (req, res) => {
	const xname = req.params.name;
	//log(xname);
	const newname = xname.replace(/_/g, " ");
	//log(newname);
	//log(Anime.find( { $name: { $search: newname } } ));
	Anime.find({ $text: { $search: newname } }).then((animes) =>{
		if(!animes){
			//log("NOT FOUND");
			res.status(404).send();
		}else{
			res.send(animes);
		}
	}).catch((error) => {
		//log(error);
		res.status(404).send();
	})
	//log("HERE");
})


app.listen(port, () => {
	log(`Listening on port ${port}...`)
});