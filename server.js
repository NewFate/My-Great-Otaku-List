/* Great Anime List server.js */
'use strict';
const log = console.log;

const express = require('express')
const bodyParser = require('body-parser')
const { ObjectID } = require('mongodb')

// Mongoose
const { mongoose } = require('./db/mongoose');
const { Anime, Review, Suggested} = require('./models/anime')
const { User } = require('./models/user')

process.env.MONGO_URL
// Express
const port = process.env.PORT || 3000
const app = express();

const session = require('express-session')

app.use(bodyParser.json());
// Limit pics to 10MB

app.use(bodyParser.json({limit: '10mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))

app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'));
app.use('/js', express.static(__dirname + '/public/js'));
app.use('/img', express.static(__dirname + '/public/img'));

app.get('/', (req, res) => {
	res.redirect('anime');
})

app.route('/anime').get((req, res) => {
	res.sendFile(__dirname + '/public/Anime.html');
})


app.route('/SuggestAnime').get((req, res) => {
	log("HERERERERERER");
	log(__dirname + '/public/SuggestAnime.html');
	res.sendFile(__dirname + '/public/SuggestAnime.html');
})

// Add express sesssion middleware
app.use(session({
	secret: 'oursecret',
	resave: false,
	saveUninitialized: false,
	cookie: {
		expires: 600000,
		httpOnly: true
	}
}))


// Add middleware to check for logged-in users
const sessionChecker = (req, res, next) => {
	if (req.session.user) {
		res.redirect('User_Profile')
	} else {
		next();
	}
}

// // route for root; redirect to login
// app.get('/', sessionChecker, (req, res) => {
// 	res.redirect('LoginRegister')
// })

// // route for login
// app.route('/LoginRegister')
// 	.get(sessionChecker, (req, res) => {
// 		res.sendFile(__dirname + '/public/LoginRegister.html')
// 	})



// POST one anime
//app.post('/anime', (req, res) =>{
	// Creating a new anime to be inserted

//}
// POST one anime
app.post('/animeinfo', (req, res) =>{
	// Creating a new anime to be inserted
	const anime = new Anime({
		name: req.body.name,
		description: req.body.description,
   		imageURL: req.body.imageURL,
    	averageScore: 0,
    	nReviews: 0
	});
	// CHECK IF THIS ANIME EXISTS ALREADY	////////////////////////
	// Save anime to the database
	anime.save().then((anime) => {
		res.send(anime);
	}, (error) =>{
		res.status(400).send(error); // Bad request
	})
})

// POST anime suggestion
app.post('/suggestinfo', (req, res) =>{
	// Creating a new anime to be inserted
	log("POSTING...");
	const suggested = new Suggested({
		name: req.body.name,
		description: req.body.description,
   		imageURL: req.body.imageURL,
    	averageScore: 0,
    	nReviews: 0
	});
	// CHECK IF THIS Suggested EXISTS ALREADY	////////////////////////
	// Save Suggested to the database
	suggested.save().then((suggested) => {
		log("POSTEd");
		res.send(suggested);
	}, (error) =>{
		log("ERRORR??");
		res.status(400).send(error); // Bad request
	})
	log("WHAT");
})


// GET all animes
app.get('/animeinfo', (req, res) =>{
	log("HERERERER");
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

// GET all suggestions
app.get('/suggestinfo', (req, res) =>{
	log("HERERERER");
	Suggested.find().then((animes) =>{
		if(!animes){
			res.status(404).send();
		}else{
			res.send(animes);
		}
	}).catch((error) => {
		res.status(404).send();
	})
})

app.delete('/suggestinfo/:name', (req, res) => {
	const xname = req.params.name;
	const newname = xname.replace(/_/g, " ");
	Suggested.findOne({ $text: { $search: newname } }).then((anime) =>{
		if(!anime){
			res.status(404).send();
		}else{
			anime.remove().then((removed) => {
				res.send(removed);
			}).catch((error) => {
				res.status(404).send();
			})
		}
	});
})

// Show one anime, by name
app.get('/anime/:name', (req, res) => {
	log("AOO");
	const xname = req.params.name;
	const newname = xname.replace(/_/g, " ");
	Anime.find({ $text: { $search: newname } }).then((animes) =>{
		if(!animes){
			res.status(404).send();
		}else{
			//res.send(animes)
			//res.sendFile(__dirname + '/public/Anime.html');
			res.render("Anime.hbs", {
				animeName: xname
			})
		}
		//log("oi");
	}).catch((error) => {
		log(error);
		res.status(404).send();
	})
	//log("HERE");
})

// GET one anime, based on name
// Name is in the url, with underscore separating words
// So kimi no na wa is kimi_no_na_wa . This is not case sensitive.
app.get('/animeinfo/:name', (req, res) => {
	const xname = req.params.name;
	//log(xname);
	const newname = xname.replace(/_/g, " ");
	log(newname);
	//log(Anime.find( { $name: { $search: newname } } ));
	Anime.findOne({ $text: { $search: newname } }).then((animes) =>{
		//log("SDADSAD");
		if(!animes){
			//log("NOT FOUND");
			res.status(404).send();
		}else{
			//anm.loadd("Kimi No Na Wa");
			//log("SEND");
			//log(animes);
			res.send(animes)
			//res.sendFile(__dirname + '/public/Anime.html');
			//res.render("Anime.hbs", {
			//	animeName: newname
			//})
		}
		//log("oi");
	}).catch((error) => {
		log(error);
		res.status(404).send();
	})
	//log("HERE");
})

// Not ready yet!

app.post('/animeinfo/:name/review', (req, res) => {
	const xname = req.params.name;
	const newname = xname.replace(/_/g, " ");

	const review = new Review({
		animeName: newname.toLowerCase(),
		reviewer: req.body.reviewer,
    	review: req.body.review,
   		grade: req.body.grade
	})


	
	Review.findOne({animeName: newname.toLowerCase(), reviewer: review.reviewer}).then((rev) =>{
		if(!rev){ // This is the first one, create a new one!
			log("Cant find you dwag!");
			//anime.reviews.push(review);
			//anime.averageScore = (anime.averageScore * (anime.reviews.length - 1) + review.grade)/anime.reviews.length;
			//log(anime.averageScore);
			/*anime.save().then((anime) => {
				res.send(anime);
			}, (error) => {
				// Bad request
				res.status(400).send(error);
			})*/

			Anime.findOne({ $text: { $search: newname } }).then((animes) =>{
				//log("SDADSAD");
				if(!animes){
					log("NOT FOUND");
					res.status(404).send();
				}else{
					log("UPADTE");
					animes.nReviews = animes.nReviews + 1;
					animes.averageScore = animes.averageScore + review.grade;
					animes.save().then((anime) => {}, (error) => {
						res.status(400).send(error);
					})
				}
				//log("oi");
			}).catch((error) => {
				log(error);
				res.status(404).send();
			})

			review.save().then((review) =>{
				//log("here");
				res.send(review);
			}, (error) => {
				res.status(400).send(error);
			})
			//log("!!!!Cant find you dwag!");
			//res.send(review);
			//res.status(404).send();
		}else{ // Already there!
			log("HAHAHAH here you are");
			let prevGrade = rev.grade;
			//anime.reviews.findOne
			/*anime.reviews.push(review);
			anime.averageScore = (anime.averageScore * (anime.reviews.length - 1) + review.grade)/anime.reviews.length;
			log(anime.averageScore);
			anime.save().then((anime) => {
				res.send(anime);
			}, (error) => {
				// Bad request
				res.status(400).send(error);
			})*/

			Anime.findOne({ $text: { $search: newname } }).then((animes) =>{
				//log("SDADSAD");
				if(!animes){
					//log("NOT FOUND");
					res.status(404).send();
				}else{
					//animes.nReviews = animes.nReviews + 1;
					animes.averageScore = animes.averageScore + review.grade - prevGrade;
					log(animes.averageScore);
					log(review.grade);
					log(prevGrade);
					animes.save().then((anime) => {}, (error) => {
						res.status(400).send(error);
					})
				}
				//log("oi");
			}).catch((error) => {
				log(error);
				res.status(404).send();
			})

			rev.review = req.body.review;
			rev.grade = req.body.grade;
			rev.save().then((review) =>{
				//log("here");
				res.send(review);
			}, (error) => {
				res.status(400).send(error);
			})
		}
	}).catch((error) => {
		log(error);
		res.status(404).send();
	})
})


app.get('/animeinfo/:name/review', (req, res) => {
	const xname = req.params.name;
	const newname = xname.replace(/_/g, " ");
	
	Review.find({animeName: newname.toLowerCase()}).then((rev) =>{
		if(rev.length == 0){ // This is the first one, create a new one!
			log("Cant find you dwag!");
			res.send([]);
			//res.status(404).send();
		}else{ // Already there!
			res.send(rev);

		}
	}).catch((error) => {
		log(error);
		res.status(404).send();
	})
})


app.listen(port, () => {
	log(`Listening on port ${port}...`)
});