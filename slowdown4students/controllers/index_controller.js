exports.home = function(req, res) {
    var aut = req.session.authenticated;    
    res.render('home', { authenticated: aut});
};

exports.login = function(req, res){
    console.log(req.body.username);
    console.log(req.body.password);
    //TODO: check if username and password exists and fits
    if (req.body.username && req.body.username === 'user' && req.body.password && req.body.password === 'pass') {
        req.session.authenticated = true;   
        req.session.user = req.body.username;   
        res.redirect(app.lookupRoute('homepage'));
    } else {
      res.render('home', {authenticated: false, type: 'alert alert-danger alert-dismissable', info: 'Error!', messages: 'Invalid username or password.'});
}
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
  
