// Require our dependecies
var express = require("express");
var bluebird = require("bluebird");
var bodyParser = require("body-parser");
var logger = require("morgan");

var mongoose = require("mongoose");
mongoose.Promise = bluebird;
mongoose.Promise = Promise;


var routes = require("./routes/routes");
var User = require("./models/User.js");
var Site = require("./models/Site.js");

// Set up a default port, configure mongoose, configure our middleware
var PORT = process.env.PORT || 3000;


var app = express();

// Use morgan and body parser with our app
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Make public a static dir
app.use(express.static("public"));
app.use("/", routes);


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





// We'll create a new user by using the User model as a class
// The "unique" rule in the User model's schema will prevent duplicate users from being added to the server
var exampleUser = new User({
  fullname: "David Laidlaw",
  email: "david@david.com",
  password: "davidlaidlaw"
});
// Using the save method in mongoose, we create our example user in the db
exampleUser.save(function(error, doc) {
  // Log any errors
  if (error) {
    console.log(error);
  }
  // Or log the doc
  else {
    console.log(doc);
  }
});





// Routes
// ======

// Handle form submission, save submission to mongo
app.post("/submit", function(req, res) {
  console.log(req.body);
  var newSite = new Site(req.body);

  // Insert the note into the notes collection
  newSite.save(function(error, doc) {
    // Log any errors
    if (error) {
      console.log(error);
      res.send(error);
    }
    // Otherwise, send the note back to the browser
    // This will fire off the success function of the ajax request
    else {
    	User.findOneAndUpdate({}, { $push: { "sites": doc._id } }, { new: true }, function(error, doc) {
    		if (error) {
    			res.send(error);
    		}
    		else {
    			res.send(doc);
    		}
    	});
    }
  });
});



// This GET route let's us see the sites we have added
app.get("/sites", function(req, res) {
  // Using our Site model, "find" every site in our urlTracker db
  Site.find({}, function(error, doc) {
    // Send any errors to the browser
    if (error) {
      res.send(error);
    }
    // Or send the doc to the browser
    else {
      res.send(doc);
    }
  });
});


// Route to see what our user data looks in the browser
app.get("/user", function(req, res) {
  // Find all of the entries of User (there's only one example set up, remember!)
  User.find({}, function(error, doc) {
    // Send an error message to the browser
    if (error) {
      res.send(error);
    }
    // Or send the doc to the browser
    else {
      res.send(doc);
    }
  });
});


// Route to see what user looks like WITH populating
app.get("/populated", function(req, res) {
  // Set up a query to find all of the entries in our User database..
  User.find({})
    // ..and string a call to populate the entry with the sites stored in the user's site array
    // This simple query is incredibly powerful. Remember this one!
    .populate("sites")
    // Now, execute that query
    .exec(function(error, doc) {
      // Send any errors to the browser
      if (error) {
        res.send(error);
      }
      // Or, send our results to the browser, which will now include the sites stored in the user document
      else {
        res.send(doc);
      }
    });
});



// Start the server
app.listen(PORT, function() {
  console.log("Now listening on port %s! Visit localhost:%s in your browser.", PORT, PORT);
});