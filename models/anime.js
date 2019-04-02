
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
    averageScore: Number
    //reviews: [ReviewsSchema]
});

//AnimeSchema.index({name: "text", averageScore: "Number"});
AnimeSchema.index({name: "text"});
ReviewsSchema.index({animeName: "text", reviewer: "text"});

const Anime = mongoose.model('Anime', AnimeSchema);
const Review = mongoose.model('Review', ReviewsSchema);

module.exports = { Anime, Review };

