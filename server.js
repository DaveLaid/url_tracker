// Require our dependecies
var express = require("express");
var bluebird = require("bluebird");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongojs = require("mongojs");
var mongoose = require("mongoose");
mongoose.Promise = bluebird;
mongoose.Promise = Promise;

var session = require("express-session");
// Requiring passport as we've configured it
var passport = require("./config/passport");

var routes = require("./routes/routes");
var User = require("./models/User.js");
var Site = require("./models/Site.js");

// Set up a default port, configure mongoose, configure our middleware
var PORT = process.env.PORT || 3000;


var app = express();

// Use morgan and body parser with our app
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Make public a static dir
app.use(express.static("./public"));
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
// var exampleUser = new User({
//   fullname: "David Laidlaw",
//   email: "david@david.com",
//   password: "davidlaidlaw"
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



// Route to post our form submission to mongoDB via mongoose
app.post("/newuser", function(req, res) {

  // We use the "User" class we defined above to check our req.body against our user model
  var newUser = new User(req.body);

  // With the new "Example" object created, we can save our data to mongoose
  // Notice the different syntax. The magic happens in userModel.js
  newUser.save(function(error, doc) {
    // Send any errors to the browser
    if (error) {
      res.send(error);
    }
    // Otherwise, send the new doc to the browser
    else {
      res.send(doc);
    }
  });
});



// Retrieve results from mongo
app.get("/all", function(req, res) {
  // Find all notes in the notes collection
  Site.find({}, function(error, found) {
    // Log any errors
    if (error) {
      console.log(error);
    }
    // Otherwise, send json of the notes back to user
    // This will fire off the success function of the ajax request
    else {
    	console.log("ALL ROUTE!")
      res.json(found);
      // res.render('all', {users: found});
    }
  });
});



// Route to see what our user data looks in the browser
app.get("/user/:id", function(req, res) {

  User.update({
    "_id": mongojs.ObjectId(req.params.id)
  }, {
    // Set updated user info once user edits their profile:
    $set: { "fullname": req.params.fullname, "email": req.params.email, "password": req.params.password }
  },
  // When that's done, run this function
  function(error, edited) {
    // show any errors
    if (error) {
      console.log(error);
      res.send(error);
    }
    // Otherwise, send the result of our update to the browser
    else {
      console.log(edited);
      res.send(edited);
    }
  });
});



// Route to see what user looks like WITH populating
app.get("/populated/:id", function(req, res) {
  // Set up a query to find all of the entries in our User database..
  User.find({"_id": mongojs.ObjectId(req.params.id)})
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




// Update fields of a site saved
app.get("/updatesite/:id", function(req, res) {
  // Update a doc in the "sites" collection with an ObjectId matching
  // the id parameter in the url
  Site.update({
    "_id": mongojs.ObjectId(req.params.id)
  }, {
    // Set updated parameters for the site we specified
    $set: { "url": req.params.url, "title": req.params.title, "category": req.params.category, "note": req.params.note, "screenshot": req.params.screenshot }

  },
  // When that's done, run this function
  function(error, edited) {
    // Show any errors
    if (error) {
      console.log(error);
      res.send(error);
    }
    // Otherwise, send the result of our update to the browser
    else {
      console.log(edited);
      res.send(edited);
    }
  });

});



// Delete One from the DB
app.get("/delete/:id", function(req, res) {
  // Remove a site using the objectID
  Site.remove({
    "_id": mongojs.ObjectID(req.params.id)
  }, function(error, removed) {
    // Log any errors from mongojs
    if (error) {
      console.log(error);
      res.send(error);
    }
    // Otherwise, send the mongojs response to the browser
    // This will fire off the success function of the ajax request
    else {
      console.log(removed);
      res.send(removed);
    }
  });
});




// Start the server
app.listen(PORT, function() {
  console.log("Now listening on port %s! Visit localhost:%s in your browser.", PORT, PORT);
});