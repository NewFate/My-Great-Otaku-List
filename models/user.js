
const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcryptjs')

const ReviewsSchema = new mongoose.Schema({
	animeName: String,
    reviewer: String,
    review: String,
    grade: Number
});

// User model, reviews will be embedded in the user model
const UserSchema = new mongoose.Schema({
    userName: {
    	type: String,
    	required: true,
    	minlength: 1,
    	trim: true,
    	unique: true
    },
    email: {
		type: String,
		required: true,
		minlength: 1,
		trim: true, // trim whitespace
		unique: true,
		validate: {
			validator: validator.isEmail,
			message: 'Not valid email'
		}
	},
	password: {
		type: String,
		required: true,
		minlength: 6
	},
    dateOfBirth: String,
    //imageURL: String,
    reviews: [ReviewsSchema]
});

//AnimeSchema.index({name: "text", averageScore: "Number"});
//AnimeSchema.index({name: "text"});
// Our own student finding function 
UserSchema.statics.findByUserNamePassword = function(username, password) {
	const User = this

	return User.findOne({userName: username}).then((user) => {
		if (!user) {
			return Promise.reject()
		}

		return new Promise((resolve, reject) => {
			bcrypt.compare(password, user.password, (error, result) => {
				if (result) {
					resolve(user);
				} else {
					reject();
				}
			})
		})
	})
}

// This function runs before saving user to database
UserSchema.pre('save', function(next) {
	const user = this

	if (user.isModified('password')) {
		bcrypt.genSalt(10, (error, salt) => {
			bcrypt.hash(user.password, salt, (error, hash) => {
				user.password = hash
				next()
			})
		})
	} else {
		next();
	}

})


UserSchema.index({userName: "text"});

const User = mongoose.model('User', UserSchema);



//const Review = mongoose.model('Review', ReviewsSchema);

module.exports = { User };

