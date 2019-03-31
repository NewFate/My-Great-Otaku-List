
const mongoose = require('mongoose');

const ReviewsSchema = new mongoose.Schema({
	animeName: String,
    reviewer: String,
    review: String,
    grade: Number
});

// User model, reviews will be embedded in the user model
const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    dateOfBirth: String,
    imageURL: String,
    averageScore: Number,
    reviews: [ReviewsSchema]
});

//AnimeSchema.index({name: "text", averageScore: "Number"});
//AnimeSchema.index({name: "text"});


const User = mongoose.model('User', UserSchema);
//const Review = mongoose.model('Review', ReviewsSchema);

module.exports = { User };

