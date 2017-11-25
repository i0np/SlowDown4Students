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