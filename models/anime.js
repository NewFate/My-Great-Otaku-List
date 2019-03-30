const mongoose = require('mongoose');

const ReviewsSchema = new mongoose.Schema({
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
    reviews: [ReviewsSchema]
});

const Anime = mongoose.model('Anime', AnimeSchema);

module.exports = { Anime };
