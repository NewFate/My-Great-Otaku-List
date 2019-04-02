
const mongoose = require('mongoose');

const ReviewsSchema = new mongoose.Schema({
	animeName: String,
    reviewer: String,
    review: String,
    grade: Number
});

// Reservations will be embedded in the Restaurant model
const AnimeSchema = new mongoose.Schema({
    name: String,
    description: String,
    imageURL: String,
    averageScore: Number,
    nReviews: Number
    //reviews: [ReviewsSchema]
});

const SuggestedSchema = new mongoose.Schema({
	name: String,
    description: String,
    imageURL: String,
    averageScore: Number,
    nReviews: Number
});

//AnimeSchema.index({name: "text", averageScore: "Number"});
AnimeSchema.index({name: "text"});
SuggestedSchema.index({name: "text"});
ReviewsSchema.index({animeName: "text", reviewer: "text"});

const Anime = mongoose.model('Anime', AnimeSchema);
const Review = mongoose.model('Review', ReviewsSchema);
const Suggested = mongoose.model('Suggested', SuggestedSchema);

module.exports = { Anime, Review, Suggested};

