let mongoose = require('mongoose');

// create a model class
let businesscontactsModel = mongoose.Schema({
    name: String,
    contactNumber: String,
    email: String,
   //description: String,
   // price: Number
},
{
    collection: "businesscontacts"
});

module.exports = mongoose.model('businesscontacts', businesscontactsModel);