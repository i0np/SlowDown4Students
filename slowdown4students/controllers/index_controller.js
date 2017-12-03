var userModel = require('../models/user_model');

exports.home = function(req, res) {
    var aut = req.session.authenticated;    
    res.render('home', { authenticated: aut});
};

exports.login = function(req, res) {
    console.log(req.body.username);
    console.log(req.body.password);

    userModel.findOne({username:req.body.username}, 'username password', function(err, user) {
        if(!err){
            if (user != null && req.body.username && req.body.username === user.username && req.body.password && req.body.password === user.password) {
                req.session.authenticated = true;   
                req.session.user = req.body.username;   
                res.redirect(app.lookupRoute('homepage'));
            } else {
              res.render('home', {authenticated: false, type: 'alert alert-danger alert-dismissable', info: 'Error!', messages: 'Invalid username or password.'});
            }
        } else {
            console.log('Error while trying to login');
            throw err;
        }        

    });

};

exports.logout = function(req,res){
    delete req.session.authenticated;
    res.redirect(app.lookupRoute('homepage'));
};

exports.calendar = function(req,res){
    var aut = req.session.authenticated;
    res.render('calendar', {authenticated: aut})
  };

exports.about = function(req,res){
    var aut = req.session.authenticated;
    res.render('about', {authenticated: aut})
};
  
