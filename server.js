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
app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname, 'public/'));

});
//start server
app.listen(() =>{
    console.log(`Server is listening on PORT: ${config.PORT}`);
});