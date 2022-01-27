//import mongoose
const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const Schema = mongoose.Schema;
let normalUserSchema = new Schema({
    first_name :{type: String, required: true, maxlength: 30},
    family_name :{type: String, required: true, maxlength: 30},
    phonenumber : {type: String, required: true, maxlength: 13},
    password :{type: String, required: true, minlength:8,  maxlength: 30},
});
//virtual property for normalUserSchema username
normalUserSchema
.virtual("username")
.get( ()=>{
    let username = '';
    if(this.first_name && this.family_name){
        username = `${this.first_name}${this.family_name}`
    }
    if(!this.first_name || !this.family_name){
        username = "";
    }
    return username;
});
// normalUserSchema
// .virtual("url")
// .get( ()=>{
//     return username;
// });
normalUserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model(normalUser, normalUserSchema);