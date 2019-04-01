const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
	reporter: String,
	reportee: String,
	anime: String,
	reason: String
});

// Reservations will be embedded in the Restaurant model
const AnimeRequestSchema = new mongoose.Schema({
    title: String,
	user: String,
	description: String
});

const AnimeRequest = mongoose.model('AnimeRequest', AnimeRequestSchema);
const Report = mongoose.model('Report', ReportSchema);

module.exports = { AnimeRequest, Report };