var db = require('../db'); // Enables access to the database.
var movies // Stores movie activites.

// Exports makes index method accessible for other files, e.g. movie_routes.js in the route folder.
// Lists all available movie activities. Renders the movies.hbs view.
exports.index = function(req, res){
    db.query("SELECT name, category, place, date FROM movie", function(error, rows, fields) {
        if (error) {
            console.log('Error in query in movie retrieval');
        }
        else{
            if(rows.length > 0){
                movies = rows;
            }
            else{
                movies = null;
            }
            res.render('movies', {movies: movies});
        }       
    });
};

// Renderes add_movie.hbs, which is a form for posting a new movie activity.
exports.add = function(req, res) {
    res.render('create_movie');
};

// Saves the post of the user and redirects to the list of all movies.
exports.save = function(req, res) {   
    var input = JSON.parse(JSON.stringify(req.body));
    var data = { 
        title: input.title,
        name: input.name,
        category: input.category,
        place: input.place,
        date: input.date    

    };
    var query = db.query("INSERT INTO movie set ? ",data, function(err, rows){
            if (err){
              console.log("Error inserting : %s ",err );
            }
            else{
                res.redirect('/movies');
            }
        });    
};