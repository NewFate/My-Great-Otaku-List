
const mongoose = require('mongoose');

// Schema for the reviews
const ReviewsSchema = new mongoose.Schema({
	animeName: String,
    reviewer: String,
    review: String,
    grade: Number
});

// Schema for the Animes
const AnimeSchema = new mongoose.Schema({
    name: String,
    description: String,
    imageURL: String,
    averageScore: Number,
    nReviews: Number
});

// Schema for suggested animes
const SuggestedSchema = new mongoose.Schema({
	name: String,
    description: String,
    imageURL: String,
    averageScore: Number,
    nReviews: Number
});

// Indexes to find items using their names:

AnimeSchema.index({name: "text"});
SuggestedSchema.index({name: "text"});
ReviewsSchema.index({animeName: "text", reviewer: "text"});

const Anime = mongoose.model('Anime', AnimeSchema);
const Review = mongoose.model('Review', ReviewsSchema);
const Suggested = mongoose.model('Suggested', SuggestedSchema);

module.exports = { Anime, Review, Suggested};

