// modules
const express = require('express');
const path = require("path");

// App variables
const app = express();
//application modules
const config = require("./config/index");

// App settings
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

 //endpoints
 //return index || User Dashboard
app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname, 'public/'));

});
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
