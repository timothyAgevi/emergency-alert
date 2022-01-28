// modules
const express = require("express");
const path = require("path");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");
const router = express. Router();

//App models
const {hospitalUser, normalUser} = require("../models/index");
//static folder
app.use(express.static('public'));
 //endpoints
 //return index 
 router.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname, 'public/'));

});

//Register normal user
router.get('/normal-user-register', (req,res,next)=>{
    res.sendFile(path.join(__dirname, 'public/', 'html/', 'normal_user_signup.html'));
    next();
});

router.post('/normal-user-register', (req,res,next) =>{
    let first_name = req.body.first_name;
    let family_name = req.body.family_name;
    let phonenumber = req.body.phonenumber;
    let password = req.body.password;
    normalUser.register( new normalUser({first_name: first_name, family_name: family_name, phonenumber: phonenumber}),
        password, (err, user)=>{
            if(err){
                console.log(err);
                return res.sendFile(path.join(__dirname, 'public/', 'html/', 'normal_user_signup.html'))
            }
            passport.authenticate("local")(
                req,res,()=>{
                    res.sendFile(path.join(__dirname, 'public', 'html/', 'login.html'));
                }
            )
        }
    
    )
});
