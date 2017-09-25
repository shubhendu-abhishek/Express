var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CompanySchema = new Schema({
    name: String,
    email: String,
    password: String
});

module.exports = mongoose.model('Company', CompanySchema);