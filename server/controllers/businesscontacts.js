let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let jwt = require('jsonwebtoken');

// create a reference to the model
let businesscontacts = require('../models/businesscontacts');

module.exports.displaybusinesscontactsList = (req, res, next) => {
    businesscontacts.find((err, businesscontactsList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            //console.log(businesscontactsList);

            res.render('businesscontacts/list', 
            {title: 'Business Contacts', 
            businesscontactsList: businesscontactsList, 
            displayName: req.user ? req.user.displayName : ''});      
        }
    });
}

module.exports.displayAddPage = (req, res, next) => {
    res.render('businesscontacts/add', {title: 'Add Business contacts', 
    displayName: req.user ? req.user.displayName : ''})          
}

module.exports.processAddPage = (req, res, next) => {
    let newbusinesscontacts = businesscontacts({
        "name": req.body.name,
        "contactNumber": req.body.contactNumber,
        "email": req.body.email,
        //"description": req.body.description,
        //"price": req.body.price
    });

    businesscontacts.create(newbusinesscontacts, (err, businesscontacts) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the book list
            res.redirect('/businesscontacts-list');
        }
    });

}

module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;

    businesscontacts.findById(id, (err, businesscontactsToEdit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            res.render('businesscontacts/edit', {title: 'Edit businesscontacts', businesscontacts: businesscontactsToEdit, 
            displayName: req.user ? req.user.displayName : ''})
        }
    });
}

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id

    let updatedbusinesscontacts = businesscontacts({
        "_id": id,
        "name": req.body.name,
        "contactNumber": req.body.contactNumber,
        "email": req.body.email,
        //"description": req.body.description,
        //"price": req.body.price
    });

    businesscontacts.updateOne({_id: id}, updatedbusinesscontacts, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the book list
            res.redirect('/businesscontacts-list');
        }
    });
}

module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    businesscontacts.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
             // refresh the book list
             res.redirect('/businesscontacts-list');
        }
    });
}