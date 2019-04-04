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
const { Report } = require('./models/admin')

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
app.use('/style', express.static(__dirname + '/public/style'));

// Add express sesssion middleware
app.use(session({
	secret: 'oursecret',
	resave: false,
	saveUninitialized: false,
	username: "",
	cookie: {
		expires: 600000,
		httpOnly: true
	}
}));


app.get('/', (req, res) => {
	//log("LOAD THIS");
	//res.redirect("login");
	//res.send(500);
	res.redirect('index');
});

app.route('/anime').get((req, res) => {
	res.render('Anime.hbs', {
		userName: req.session.username
	})
	//res.sendFile(__dirname + '/public/Anime.html');
})

app.route('/login').get((req, res) => {
	res.render('LoginRegister.hbs', {
		userName: req.session.username
	})
	//res.sendFile(__dirname + '/public/LoginRegister.html');
})

app.route('/register').get((req, res) => {
	res.render('register.hbs', {
		userName: req.session.username
	})
	//res.sendFile(__dirname + '/public/register.html');
})

app.route('/allanime').get((req, res) => {
	res.render('AllAnime.hbs', {
		userName: req.session.username
	})
	//res.sendFile(__dirname + '/public/AllAnime.html');
})

app.route('/index').get((req, res) => {
	res.render('index.hbs', {
		userName: req.session.username
	})
	//res.sendFile(__dirname + '/public/index.html');
})

app.route('/admin').get((req, res) => {
	/// CHECK IF ITS LOGGED IN
	res.render('Admin.hbs', {
		userName: req.session.username
	})
	//res.sendFile(__dirname + '/public/Admin.html');
})
/*
app.route('/report').get((req, res) => {
	/// CHECK IF ITS LOGGED IN
	res.sendFile(__dirname + '/public/Report.html');
})*/

/*app.route('/userprofile').get((req, res) => {
	/// CHECK IF ITS LOGGED IN
	res.sendFile(__dirname + '/public/User_Profile.html');
})*/

// Middleware for authentication for resources
const authenticate = (req, res, next) => {
	if (req.session.user) {
		User.findById(req.session.user).then((user) => {
			if (!user) {
				return Promise.reject()
			} else {
				req.user = user
				next()
			}
		}).catch((error) => {
			res.redirect('/login')
		})
	} else {
		res.redirect('/login')
	}
}




app.route('/SuggestAnime').get(authenticate, (req, res) => {
	log("HERERERERERER");
	log(__dirname + '/public/SuggestAnime.html');
	res.render('SuggestAnime.hbs', {
		userName: req.session.username
	})
	//res.sendFile(__dirname + '/public/SuggestAnime.html');
})




app.get('/username', authenticate, (req, res) => {
	res.send(req.session.username);
});

//Create a new user
app.post('/register', (req, res) =>{
	const user = new User({
		userName: req.body.username,
		email: req.body.email,
		password: req.body.password,
		dateOfBirth: req.body.dateOfBirth
	})

	user.save().then((user) => {
		log("SAVED USER");
		//res.send(user);
		//res.redirect('/login');
		res.render('LoginRegister.hbs', {
			userName: req.session.username
		})
	}, (error) =>{
		log("COULDNT SEND ");
		log(error);
		res.status(400).send(error);
	})

});

app.get('/userprofile', (req, res) => {
	//res.sendFile(__dirname + '/public/dashboard.html')
	console.log("Render")
	res.render('User_Profile.hbs', {
		userName: req.session.username,
		email: req.session.email,
		dob: req.session.dob
	})
})

// Log in
app.post('/login', (req, res) =>{
	const username = req.body.username
	const password = req.body.password
	log("THIS ");
	User.findByUserNamePassword(username, password).then((user) => {
		if(!user) {
			res.redirect('/login')
		} else {			
			console.log('User Found');
			console.log(user.userName)
			req.session.user = user._id;
			req.session.username = user.userName;
			req.session.email = user.email;
			req.session.dob = user.dateOfBirth;
			req.session.reviews = user.reviews;

			res.send(user);
		}
	}).catch((error) => {
		res.status(400).send(error);
	})

});

// Log out
app.get('/logout', (req, res) => {
	req.session.destroy((error) => {
		if (error) {
			res.status(500).send(error)
		} else {
			res.redirect('/login')
		}
	})
})

// Get all users
app.get('/users', (req, res) => {
	// Add code here
	User.find().then((user) => {
		if (!user) {
			res.status(404).send()
		} else {
			res.send(user)}
		
		}).catch((error) => {
			res.status(500).send()
		})

})


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

	log("IM gonna add an anime with picture");
	log(anime.imageURL);
	log("ENDING");
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


// GET all reviews
app.get('/animereviews', (req, res) =>{
	log("HERERERER");
	Review.find().then((animesrev) =>{
		if(!animesrev){
			res.status(404).send();
		}else{
			res.send(animesrev);
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
				log("REMOVED!!!");
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
				userName: req.session.username,
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

//POST new report
app.post('/report', authenticate, (req, res) =>{

	const report = new Report({
		reporter: req.session.username,
		reportee: req.body.reportee,
		anime: req.body.anime,
		reason: req.body.reason,
	});

	report.save().then((reportData) => {
		log("SAVED REPORT");
		res.send(reportData);
	}, (error) =>{
		log("CANT DOSVILLE");
		res.status(400).send(error); // Bad request
	})
})

//GET all reports

app.get('/report/:reviewer/:anime', authenticate, (req, res) => {
	const xname = req.params.anime;
	const newname = xname.replace(/_/g, " ");
	log("NEWNAME IS");
	log(newname);
	res.render('Report.hbs', {
		reviewer: req.params.reviewer,
		animeName: newname,
		userName: req.session.username
		//userName: "TEOsadasdasddasds"
	})
})

app.get('/report', (req, res) => {
	/*const id = req.params.id

	if (!ObjectID.isValid(id)) {
		return res.status(404).send()
	}*/
	log("HERER??");
	Report.find().then((reports) => {
		log("FOUND THESE REPORTS");
		log(reports);
		res.send(reports)
	}).catch((error) => {
		log("COULDNT FIND IT");
		res.status(500).send()
	})
	log("WHAT");
})

//GET certain report
app.get('/report/:id', (req, res) => {
	const id = req.params.id

	if (!ObjectID.isValid(id)) {
		return res.status(404).send()
	}

	Report.findById(id).then((report) => {
		if (!report) {
			res.status(404).send()
		} else {
			res.send({ report })
		}
		
	}).catch((error) => {
		res.status(500).send(error)
	})
})

//DELETE certain report
app.delete('/report/:id', (req, res) => {
	const id = req.params.id

	if (!ObjectID.isValid(id)) {
		res.status(404).send()
	}

	Report.findByIdAndRemove(id).then((report) => {
		if (!report) {
			res.status(404).send()
		} else {   
			res.send(report)
		}
	}).catch((error) => {
		res.status(500).send()
	})
})

app.delete('/reportbyname/:name', (req, res) => {
	const name = req.params.name
	log("TRIED TO REMOVE");
	log(name);
	Report.find({ $text: { $search: name } }).then((reports) =>{
		if(!reports){
			log("Did not find reports");
			res.status(404).send();
		}else{
			let ret = [];
			for(let i = 0 ; i<reports.length; i++){
				reports[i].remove().then((removed) => {
					log("REMOVED!!!");
					ret.add(removed);
					//res.send(removed);
				}).catch((error) => {
					log(error)
					res.status(404).send();
				})
			}
			res.send(ret);
		}
	});
})

app.delete('/user/:username', (req, res) => {
	User.findOne({ $text: { $search: req.params.username } }).then((user) =>{
		if(!user){
			log("Did not find user");
			res.status(404).send();
		}else{
			user.remove().then((removed) => {
				log("REMOVED user!!!");
				res.send(removed);
			}).catch((error) => {
				log("remove error")
				res.status(404).send();
			})
		}
	});
})

app.listen(port, () => {
	log(`Listening on port ${port}...`)
});