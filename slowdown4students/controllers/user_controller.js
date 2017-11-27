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
            to: 'muellerchristina@bluewin.ch', // list of receivers
            subject: 'Activity Registration', // Subject line
            text: text // Text
        };

        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                console.log(error);
                res.json({yo: 'error'});
            }else{
                console.log('Message sent: ' + info.response);
                res.json({yo: info.response});
            };
        });


        req.flash('success', 'You are registered.');
        res.redirect(app.lookupRoute('movies'));
    };
};