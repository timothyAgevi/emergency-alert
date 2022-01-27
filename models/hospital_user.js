//import mongoose
const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const Schema = mongoose.Schema;
let hospitalUserSchema = new Schema({
    hospital_name :{type: String, required: true, maxlength: 30},
    contact_number : {type: String, required: true, maxlength: 13},
    password :{type: String, required: true, minlength:8,  maxlength: 30},
});
// Export model
hospitalUserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model(hospitalUser, hospitalUserSchema);