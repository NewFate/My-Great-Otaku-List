const mongoose = require('mongoose');

//Only model in the admin is the report schema
const ReportSchema = new mongoose.Schema({
	reporter: String,
	reportee: String,
	anime: String,
	reason: String
});

//Index to allow searching for specific reportees
ReportSchema.index({reportee: "text"});

const Report = mongoose.model('Report', ReportSchema);

module.exports = { Report };