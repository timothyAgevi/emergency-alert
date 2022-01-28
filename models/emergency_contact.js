//import mongoose
const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const Schema = mongoose.Schema;
//import mongo db
let emergencyContactSchema = new Schema({
    emergency_contact_name :{type: String, required: true, maxlength: 30},
    emergency_contact_number : {type: String, required: true, maxlength: 13},
    password :{type: String, required: true, minlength:8,  maxlength: 30},
});
// Export model
emergencyContactSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model(emergencyContact, emergencyContactSchema);