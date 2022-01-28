// modules
const express = require('express');
const path = require("path");
const session = require("express-session");

// App variables
const app = express();
//application modules
const config = require("./config/index");
const db = require("./database/database");

// App cookies
let sess = {
  secret: config.SESSION_SECRET,
  cookie: {maxAge: 60000},
  resave: false,
  saveUninitialized: false,
}
if(app.get('env') === "production"){
  app.set('trust proxy', 1);
  sess.cookie.secure = true;
}


// App settings
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(session(sess));


// //Normal User registration
app.post('/normal_user', (req,res) =>{

});

// //Hospital User registration
app.post('/hospital_user', (req,res) =>{

});

// //User login
app.post('/', (req,res)=>{

});
// //start server
app.listen(config.PORT,() =>{
  console.log(`Server listening at http://localhost:${config.PORT}`);
 });
