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


// This is an attempt to limit pics to 10MB, unsuccessful I believe
app.use(bodyParser.json({limit: '10mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))

app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'));
app.use('/js', express.static(__dirname + '/public/js'));
app.use('/img', express.static(__dirname + '/public/img'));
app.use('/style', express.static(__dirname + '/public/style'));


// Our session
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

// Middleware to:
// Check if the user is really logged in and if it exists.
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
			res.redirect('/login');
		})
	} else {
		// If not, go login!
		res.redirect('/login');
	}
}

// Default behaviour.
app.get('/', (req, res) => {
	res.redirect('index');
});

// Route for the anime page.
app.route('/anime').get((req, res) => {
	res.render('Anime.hbs', {
		userName: req.session.username
	})
})

// Route for the login page.
app.route('/login').get((req, res) => {
	res.render('LoginRegister.hbs', {
		userName: req.session.username
	})
})

// Route for the register page.
app.route('/register').get((req, res) => {
	res.render('register.hbs', {
		userName: req.session.username
	})
})

// Route for the allAnime page.
app.route('/allanime').get((req, res) => {
	res.render('AllAnime.hbs', {
		userName: req.session.username
	})
})

// Route for the index (main page).
app.route('/index').get((req, res) => {
	res.render('index.hbs', {
		userName: req.session.username
	})
})

// Route for the admin page.
app.route('/admin').get(authenticate, (req, res) => {
	// Since it arrived here, and we are using  the authenticate
	// middleware, then we are sure that the person is logged in,
	// now we just need to check if its admin or not.
	if(req.session.username != "admin"){
		res.route('/login');
		return;
	}
	res.render('Admin.hbs', {
		userName: req.session.username
	})
})

// Route for the suggest anime page, needs to be authenticated.
app.route('/SuggestAnime').get(authenticate, (req, res) => {
	res.render('SuggestAnime.hbs', {
		userName: req.session.username
	})
})

// Get to get the username of the person logged in.
app.get('/username', authenticate, (req, res) => {
	res.send(req.session.username);
});

// Register a new user.
app.post('/register', (req, res) =>{
	const user = new User({
		userName: req.body.username,
		email: req.body.email,
		password: req.body.password,
		dateOfBirth: req.body.dateOfBirth
	})

	user.save().then((user) => {
		// Send them to the Login page so they can now login.
		res.render('LoginRegister.hbs', {
			userName: req.session.username
		})
	}, (error) =>{
		res.status(400).send(error);
	})

});

// Get a user profile, will also keep count of information.
app.get('/userprofile', authenticate, (req, res) => {
	let report_count = 0;

	// Count how many reports this user has sent.
	Report.find().then((reports) => {
		let review_count = 0;
		for(let i = 0; i < reports.length; i++){
			if(reports[i].reporter === req.session.username){
				report_count++;
			}
		}
		// Count how many reviews this user has sent.
		Review.find().then((reviews) => {
			for(let i = 0; i < reviews.length; i++){
				if(reviews[i].reviewer === req.session.username){
					review_count++;
				}
			}
			// Render the profile with the information acquired.
			res.render('User_Profile.hbs', {
				userName: req.session.username,
				email: req.session.email,
				dob: req.session.dob,
				reviewCount: review_count,
				reportCount: report_count
			})
		}).catch((error) => {
			res.status(500).send()
		})
	}).catch((error) => {
		res.status(500).send()
	})
})

// Log in
app.post('/login', (req, res) =>{
	const username = req.body.username
	const password = req.body.password

	// Find this user by its name and password.
	User.findByUserNamePassword(username, password).then((user) => {
		if(!user) {
			// If not found, go login
			res.redirect('/login')
		} else {			
			// If found, load his info on our cookie
			req.session.user = user._id;
			req.session.username = user.userName;
			req.session.email = user.email;
			req.session.dob = user.dateOfBirth;

			// Send the user back.
			res.send(user);
		}
	}).catch((error) => {
		res.status(400).send(error);
	})

});

// Log out
app.get('/logout', (req, res) => {
	// Remove the cookie.
	req.session.destroy((error) => {
		if (error) {
			res.status(500).send(error)
		} else {
			// Go login now.
			res.redirect('/login')
		}
	})
})

// Get all users
app.get('/users', (req, res) => {

	// Simply return all users.
	User.find().then((user) => {
		if (!user) {
			res.status(404).send()
		} else {
			res.send(user)}
		
	}).catch((error) => {
		res.status(500).send()
	})

})


// POST one anime, needs to be authenticated.
app.post('/animeinfo', authenticate, (req, res) =>{
	// Creating a new anime to be inserted
	const anime = new Anime({
		name: req.body.name,
		description: req.body.description,
   		imageURL: req.body.imageURL,
    	averageScore: 0,
    	nReviews: 0
	});

	// Saving this anime to the database.
	anime.save().then((anime) => {
		res.send(anime);
	}, (error) =>{
		res.status(400).send(error);
	})
})

// POST an anime suggestion, needs to be authenticated.
app.post('/suggestinfo', authenticate, (req, res) =>{
	// Create a new suggestion.
	const suggested = new Suggested({
		name: req.body.name,
		description: req.body.description,
   		imageURL: req.body.imageURL,
    	averageScore: 0,
    	nReviews: 0
	});
	// Save Suggested to the database
	suggested.save().then((suggested) => {
		res.send(suggested);
	}, (error) =>{
		res.status(400).send(error);
	})
})


// GET all animes
app.get('/animeinfo', (req, res) =>{
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

// Delete a suggestion by the anime name.
app.delete('/suggestinfo/:name', authenticate, (req, res) => {
	const xname = req.params.name;
	const newname = xname.replace(/_/g, " ");
	// Find, and remove it.
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
	const xname = req.params.name;
	const newname = xname.replace(/_/g, " ");

	// Find this anime, and render it.
	Anime.find({ $text: { $search: newname } }).then((animes) =>{
		if(!animes){
			res.status(404).send();
		}else{
			res.render("Anime.hbs", {
				userName: req.session.username,
				animeName: xname
			})
		}
	}).catch((error) => {
		res.status(404).send();
	})
})

// GET one anime info, based on name
// Name is in the url, with underscore separating words
// So kimi no na wa is kimi_no_na_wa . This is not case sensitive.
app.get('/animeinfo/:name', (req, res) => {
	const xname = req.params.name;
	const newname = xname.replace(/_/g, " ");
	// Find and return the anime info
	Anime.findOne({ $text: { $search: newname } }).then((animes) =>{
		if(!animes){
			res.status(404).send();
		}else{
			res.send(animes)
		}
	}).catch((error) => {
		res.status(404).send();
	})
})

// Post a review to the anime referenced.
app.post('/animeinfo/:name/review', authenticate, (req, res) => {
	const xname = req.params.name;
	const newname = xname.replace(/_/g, " ");

	// Review to be added.
	const review = new Review({
		animeName: newname.toLowerCase(),
		reviewer: req.session.username,
    	review: req.body.review,
   		grade: req.body.grade
	})

	Review.findOne({animeName: newname.toLowerCase(), reviewer: review.reviewer}).then((rev) =>{
		
		if(!rev){ 
			// This is the first review by this person on this anime,
			// create a new one!

			Anime.findOne({ $text: { $search: newname } }).then((animes) =>{
				if(!animes){
					res.status(404).send();
				}else{
					// Update the anime information.
					animes.nReviews = animes.nReviews + 1;
					animes.averageScore = animes.averageScore + review.grade;
					animes.save().then((anime) => {}, (error) => {
						res.status(400).send(error);
					})
				}
			}).catch((error) => {
				res.status(404).send();
			})
			// Save the review.
			review.save().then((review) =>{
				res.send(review);
			}, (error) => {
				res.status(400).send(error);
			})
		}else{ 
			// If this person already has a review on this anime,
			// I'll update it instead
			let prevGrade = rev.grade;

			// Update anime information
			Anime.findOne({ $text: { $search: newname } }).then((animes) =>{
				if(!animes){
					res.status(404).send();
				}else{
					animes.averageScore = animes.averageScore + review.grade - prevGrade;
					animes.save().then((anime) => {}, (error) => {
						res.status(400).send(error);
					})
				}
			}).catch((error) => {
				res.status(404).send();
			})

			// Update review.
			rev.review = req.body.review;
			rev.grade = req.body.grade;
			rev.save().then((review) =>{
				res.send(review);
			}, (error) => {
				res.status(400).send(error);
			})
		}
	}).catch((error) => {
		res.status(404).send();
	})
})

// Get all reviews by the name of who reviewed it.
app.get('/animeinfo/:name/review', (req, res) => {
	const xname = req.params.name;
	const newname = xname.replace(/_/g, " ");
	
	Review.find({animeName: newname.toLowerCase()}).then((rev) =>{
		if(rev.length == 0){
			// If no reviews.
			res.send([]);
		}else{ 
			res.send(rev);
		}
	}).catch((error) => {
		res.status(404).send();
	})
})

//POST a new report, needs to authenticate.
app.post('/report', authenticate, (req, res) =>{
	// Create the report
	const report = new Report({
		reporter: req.session.username,
		reportee: req.body.reportee,
		anime: req.body.anime,
		reason: req.body.reason,
	});
	// Save the report
	report.save().then((reportData) => {
		res.send(reportData);
	}, (error) =>{
		res.status(400).send(error); // Bad request
	})
})

// Load the report page with reviewer and anime name in place, needs
// to be authenticated
app.get('/report/:reviewer/:anime', authenticate, (req, res) => {
	const xname = req.params.anime;
	const newname = xname.replace(/_/g, " ");

	res.render('Report.hbs', {
		reviewer: req.params.reviewer,
		animeName: newname,
		userName: req.session.username
	})
})

// Get for all reports, need to authenticate.
app.get('/report', authenticate, (req, res) => {
	Report.find().then((reports) => {
		res.send(reports)
	}).catch((error) => {
		res.status(500).send()
	})
})

// Get a report by id, needs to authenticate.
app.get('/report/:id', authenticate, (req, res) => {
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

// Delete a report by id, needs to authenticate.
app.delete('/report/:id', authenticate, (req, res) => {
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

// Delete a report by the name of the person that was reported.
// This is used when a user is banned, there is no reason to
// keep reports about someone that was banned, needs to authenticate.
app.delete('/reportbyname/:name', authenticate, (req, res) => {
	const name = req.params.name
	// Find those reports
	Report.find({ $text: { $search: name } }).then((reports) =>{
		if(!reports){
			// No reports to remove.
			res.status(404).send();
		}else{
			let ret = [];
			// Remove each one.
			for(let i = 0 ; i<reports.length; i++){
				reports[i].remove().then((removed) => {
					ret.push(removed);
				}).catch((error) => {
					res.status(404).send();
				})
			}
			res.send(ret);
		}
	});
})

// Banning a user by username, needs to authenticate.
app.delete('/user/:username', authenticate, (req, res) => {
	User.findOne({ $text: { $search: req.params.username } }).then((user) =>{
		if(!user){
			res.status(404).send();
		}else{
			user.remove().then((removed) => {
				res.send(removed);
			}).catch((error) => {
				res.status(404).send();
			})
		}
	});
})

// Delete a review by the name of the reviewer, to use when 
// someone has been banned. Also updates the anime that each
// review was in. Needs authentication.
app.delete('/review/:reviewer', authenticate, (req, res) => {
	const xname = req.params.reviewer;
	const newname = xname.replace(/_/g, " ");

	// Find and remove all their reviews.
	Review.find({reviewer: xname}).then((rev) =>{
		if(!rev){
			res.status(404).send();
		}else{
			let ret = [];
			for(let i = 0 ; i<rev.length; i++){
				// Also need to update the anime 
				//that wont have this review anymore.
				const yname = rev[i].animeName;
				const new2name = yname.replace(/_/g, " ");

				// Find this anime, and render it.
				Anime.findOne({ $text: { $search: new2name } }).then((anime) =>{
					if(!anime){
						res.status(404).send();
					}else{
						anime.nReviews = anime.nReviews - 1;
						anime.averageScore = anime.averageScore - rev[i].grade;
						anime.save();
					}
				}).catch((error) => {
					res.status(404).send();
				})

				rev[i].remove().then((removed) => {
					ret.push(removed);
				}).catch((error) => {
					res.status(404).send();
				})
			}
			res.send(ret);
		};
	}).catch((error) => {
		res.status(404).send();
	})
})

// Get reviews given a reviewer's name
app.get('/review/:reviewer', (req, res) => {
	const xname = req.params.reviewer;
	const newname = xname.replace(/_/g, " ");
	
	Review.find({reviewer: xname}).then((rev) =>{
		if(!rev){
			res.status(404).send();
		}else{
			res.send(rev);
		};
	}).catch((error) => {
		res.status(404).send();
	})
})

app.listen(port, () => {
	log(`Listening on port ${port}...`)
});