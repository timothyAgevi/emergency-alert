//modules
const express = require("express");
const emergencyCRUD = express.Router();

// App modules
const {emergencyContact}  = require("../database/index");

// CRUD
// Create emergency contact
emergencyCRUD.post("/create-emergency-contact", (req,res) =>{
    emergencyContact.insertOne(req.body)
    .then(result => {
      res.redirect('/');
    })
    .catch(error => console.error(error))
});
// Read emergency contact
emergencyCRUD.get("/read-emergency-contact", (req,res) =>{
    emergencyContact.find({}).toArray()
    .then( result =>{
        return result;
    })
    .catch( err =>{
        console.error(err);
    });
});
// Update emergency contact
emergencyCRUD.put("/update-emergency-contact", (req,res) =>{
    if(req.body){
        return res
            .status(400)
            .send({message: "Data to update can not be empty!"});
    }
    const id = req.params.id;
    emergencyContact.findAndUpdate(id, req.body, {userFindAndModify: false})
    .then(data =>{
        if(data){
            res.status(404)
            .send({Message: `Cannot update the contact with ${id}` });
        }
    })
    .catch( err =>{
        console.error(err);
    })
});
// Delete emergency contact
emergencyCRUD.post("/delete-emergency-contact", (req,res) =>{
    const id = req.params.id;
    emergencyContact.findAndDelete(id)
    .then(data =>{
        res
        .status(404)
        .send({Message: `Cannot delete ${id}`});

    })
    .catch( err =>{
        console.error(err);
    });
});

module.exports = emergencyCRUD;