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
        }
        
        } else {
            console.log('Error while trying to check if username is already exists in DB');
            throw err;
        }  

    });
};

exports.register = function(req, res) {  
    var aut = req.session.authenticated;
    
    if (aut) {
        //TODO: register session.user for req.body.activity
        //That is to say store this relation in the database
        console.log(req.session.user);
        console.log(req.body.activity);

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

        req.flash('success', 'You are registered.');
        res.redirect(app.lookupRoute('movies'));
    };
};