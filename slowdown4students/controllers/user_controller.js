var userModel = require('../models/user_model');

exports.save = function(req, res) {
    var user = new userModel();
    user.username = req.body.username;
    user.password = req.body.password;
    user.firstname = req.body.firstname;
    user.lastname = req.body.lastname;
    user.email = req.body.email;
    user.university = req.body.university;
    user.immatriculation_number = req.body.immatriculation_number;
    //TODO: check that username is unique, sincde it is used as session id.
    user.save(function(err) {
        if (err) {
            console.log('User not inserted in DB');
            throw err;
        }
        else {
            console.log('User inserted in DB successfully');
            res.render('home', {authenticated: false,  type: 'alert alert-success alert-dismissable', info: 'Success!', messages: 'You have successfully signed in!'});
        }
      
      });
};

exports.register = function(req, res){  
    var aut = req.session.authenticated;
    if (aut) {
        //TODO: register session.user for req.body.activity
        //That is to say store this relation in the database
        console.log(req.session.user);
        console.log(req.body.activity);
        //TODO: send email to user if registered
        //TODO: flash message that user is registered (also use this flash message for sign up).
        res.redirect(app.lookupRoute('movies'));
    };
};