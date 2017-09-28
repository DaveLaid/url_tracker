// Require our dependecies
var express = require("express");
var bluebird = require("bluebird");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongojs = require("mongojs");
var mongoose = require("mongoose");
var cookieParser = require('cookie-parser');
var session = require("express-session");

mongoose.Promise = bluebird;

// Requiring passport as we've configured it
// var passport = require("./config/passport");

var routes = require("./routes/routes");
var User = require("./models/User.js");
var Site = require("./models/Site.js");

// Set up a default port, configure mongoose, configure our middleware
var PORT = process.env.PORT || 3000;

var app = express();

// Use morgan and body parser with our app
app.use(logger("dev"));

// Make public a static dir

// app.use(express.static("./public"));

app.use(express.static("./public/bundle.js"));
app.use('/css', express.static('./public/css'))
app.use('/fonts', express.static('./public/fonts'))
app.use('/img', express.static('./public/img'))
app.use('/js', express.static('./public/js'))


app.use(cookieParser());
// app.use(session({
// 	secret:'anyStringOfText',
//     saveUnInitialized: true,
//     resave: true }
//    ));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ... continue with Express.js app initialization ...
app.use(require('connect-flash')()); // see the next section
// app.use(passport.initialize());

var db = process.env.MONGODB_URI || "mongodb://localhost/urlTracker";

// Connect mongoose to our database
mongoose.connect(db, function(error) {
  // Log any errors connecting with mongoose
  if (error) {
    console.error(error);
  }
  // Or log a success message
  else {
    console.log("Mongoose connection is successful");
  }
});

routes(app);


// We'll create a new user by using the User model as a class
// The "unique" rule in the User model's schema will prevent duplicate users from being added to the server
// var exampleUser = new User({
//   fullname: "David Laidlaw",
//   email: "david@david.com",
//   password: "davidl"
// });
// // Using the save method in mongoose, we create our example user in the db
// exampleUser.save(function(error, doc) {
//   // Log any errors
//   if (error) {
//     console.log(error);
//   }
//   // Or log the doc
//   else {
//     console.log(doc);
//   }
// });



// Start the server
app.listen(PORT, function() {
  console.log("Now listening on port %s! Visit localhost:%s in your browser.", PORT, PORT);
});