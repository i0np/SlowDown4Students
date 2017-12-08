var userModel = require('../models/user_model');
var movieActivityModel = require('../models/movieactivity_model');

exports.save = function(req, res) {

    req.checkBody('password', 'Password missing.').notEmpty();
    req.checkBody('firstname', 'Firstname missing.').notEmpty();
    req.checkBody('lastname', 'Lastname missing.').notEmpty();
    req.checkBody('email', 'Email missing.').notEmpty();
    req.checkBody('username', 'Username missing.').notEmpty();
    req.checkBody('university', 'University missing.').notEmpty();
    req.checkBody('immatriculation_number', 'Immatriculation Number missing.').notEmpty();
    req.checkBody('email', 'Email invalid.').isEmail();
    req.checkBody('immatriculation_number', 'Immatricualtion Number must be a number.').isInt();


    var errors = req.validationErrors();
    if (errors) {
        console.log(errors)
        res.render('home', {authenticated: false,  type: 'alert alert-danger alert-dismissable', info: 'Inserted data invalid!', formErrors: errors});
    }
    else {
        var user = new userModel();
        user.username = req.body.username;
        user.password = req.body.password;
        user.firstname = req.body.firstname;
        user.lastname = req.body.lastname;
        user.email = req.body.email;
        user.university = req.body.university;
        user.immatriculation_number = req.body.immatriculation_number;
        
        userModel.findOne({username:req.body.username}, 'username', function(err, userCheck) {
            if (!err) {
                if (userCheck == null) {
                    console.log('User is not present in DB. Go ahead to insert: ');
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
                } else {
                    console.log('Username is already exists in DB');
                    res.render('home', {authenticated: false, type: 'alert alert-danger alert-dismissable', info: 'Error!', messages: 'Username already exists.'});
                }
            
            } else {
                console.log('Error while trying to check if username is already exists in DB');
                throw err;
            } 
        });
    }
};

exports.register = function(req, res) {  
    var aut = req.session.authenticated;

    if (aut) {
        console.log(req.session.user);
        console.log(req.body.activity);

    // Check if the user has registered for the same activity
    movieActivityModel.find({user:req.session.user, name:req.body.activity}, 'user name place', function(err, userActivity) {
        if (!err) {
            if(userActivity.length>0) {
                console.log('User has already registered for the same activity: ' + userActivity);
            } else {
                console.log('User has not registered for the same activity. So go ahead for activity registration');
                // insert user activity in DB
                var movieactivity = new movieActivityModel();
                movieactivity.name = req.body.activity;
                movieactivity.category = req.body.category;
                movieactivity.place = req.body.place;
                movieactivity.date = req.body.date;
                movieactivity.user = req.session.user;

                movieactivity.save(function (err) {
                    if (err) {
                        console.log('Movieactivity not inserted in DB');
                        throw err;
                    }
                    else {
                        console.log('Movieactivity inserted in DB successfully');
                    }

                });

               // Send the email
               userModel.findOne({username:req.session.user}, 'email', function(err, userEmail) {
                if (!err) {     
    
                    var transporter = nodemailer.createTransport({
                        service: 'Gmail',
                        auth: {
                            user: 'slowdown4students@gmail.com', // Your email id
                            pass: 'contactemailadress1' // Your password
                        }
                    }); 
    
                    var text = "Dear " + req.session.user + "\n\n" + "You are successfully registered for the movie activity "+ req.body.activity + "\n\n"+"Your SlowDown4Students Team.";
                    
                    var mailOptions = {
                        from: 'slowdown4students@gmail.com', // sender address
                        to: userEmail.email, // recipient address (logged in user address)
                        subject: 'Activity Registration', // Subject line
                        text: text // Text
                    };
                    
                    transporter.sendMail(mailOptions, function(error, info) {
                        if(error) {
                            console.log(error);
                            res.json({yo: 'error'});
                        } else {
                            console.log('Message sent: ' + info.response);
                            res.json({yo: info.response});
                        };
                    });
                    
                } else {
                    console.log('Error while trying to retrive user email from DB. So registration confirmation not sent to '+ req.session.user + 'for activity' + req.body.activity);
                    throw err;
                }  
            });

            }
   
        } else {
            console.log('Error while trying to retrive the same activity for the user from DB');
            throw err;
        }  
    });

        req.flash('success', 'You are registered.');
        res.redirect(app.lookupRoute('movies'));
    };
};