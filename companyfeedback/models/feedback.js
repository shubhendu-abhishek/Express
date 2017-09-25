var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FeedbackSchema = new Schema({
    companyId: String,
    rating: Number,
    message: String
});

module.exports = mongoose.model('Feedback', FeedbackSchema);