// modules
const express = require("express");
const path = require("path");
const passport = require("passport");
const LocalStrategy = require("passport-local");
// const passportLocalMongoose = require("passport-local-mongoose");
const router = express. Router();

//App models
const {hospitalUser, normalUser} = require("../models/index");
//static folder
router.use(express.static('public'));

// Passport middleware
router.use(passport.initialize());
router.use(passport.session());
 //normal user
passport.use(new LocalStrategy(normalUser.authenticate()));
passport.serializeUser(normalUser.serializeUser());
passport.deserializeUser(normalUser.deserializeUser());

// hospital user
passport.use(new LocalStrategy(hospitalUser.authenticate()));
passport.serializeUser(hospitalUser.serializeUser());
passport.deserializeUser(hospitalUser.deserializeUser());
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
    next()
});
// Hospital user register
router.get('/hospital-user-register', (req,res,next)=>{
    res.sendFile(path.join(__dirname, 'public/', 'html/', 'hospital_signup.html'));
    next();
});

router.post('/hospital-user-register', (req,res,next) =>{
    let hospital_name = req.body.hospital_name;
    let contact_number = req.body.contact_number;
    let password = req.body.password;
    hospitalUser.register( new normalUser({hospital_name: hospital_name, contact_number: contact_number}),
        password, (err, user)=>{
            if(err){
                console.log(err);
                return res.sendFile(path.join(__dirname, 'public/', 'html/', 'hospital_signup.html'))
            }
            passport.authenticate("local")(
                req,res,()=>{
                    res.sendFile(path.join(__dirname, 'public', 'html/', 'login.html'));
                }
            )
        }
    
    )
    next()
});
//user login
router.get('/login', (req,res,next)=>{
    res.sendFile(path.join(__dirname, 'public/', 'html/', 'login.html'));
    next()
});
router.post('/login', passport.authenticate("local", {
    onSuccess : res.sendFile(path.join(__dirname, "public/", "html/", "user_profile.html")),
    onFail: res.sendFile(path.join(__dirname, "public/", "html/", "login.html"))
}),(req,res,next) =>{
    res.send({Message: "Login Successful!"})
    next();
});

// Dashboard
router.get('/dashboard', isLoggedIn, (req,res)=>{
    res.sendFile(path.join(__dirname, "public/", "html/", "user_profile.html"));
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()){
        return next();
    }else{
        res.sendFile(path.join(__dirname, "public/","html/", "login.html"));
    }
    
}

module.exports = router;