//importing mongoose 
const mongoose = require("mongoose");

//importing the configuration
const config = require("../config/index");
const db_uri = config.DB_URI;
//establishing database connection
mongoose.connect(db_uri,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
let conn = mongoose.connection;
//Listening for database connection events
conn.on("connected",
    ()=>{
        console.log("Database is successfully connected");
    }
);
conn.on("disconnected",
    ()=>{
        console.log("Database is successfully disconnected");
    }    
);
conn.on("error",
    console.error.bind(
        console,
        "Connection error: "
    )
);
//exporting the database connection
module.exports = conn;