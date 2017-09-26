// Require our dependecies
var express = require("express");
var bluebird = require("bluebird");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongojs = require("mongojs");
var mongoose = require("mongoose");
mongoose.Promise = bluebird;


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


// ... continue with Express.js app initialization ...
app.use(require('connect-flash')()); // see the next section
app.use(passport.initialize());

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



// Routes
// ======



//-------------------------------------------------------------
//-- api routes -----------------------------------------------

// Using the passport.authenticate middleware with our local strategy.
// If the user has valid login credentials, send them to the Create Flashcards page.
// Otherwise the user will be sent an error
// app.post("/api/login", passport.authenticate("local"), function(req, res) {
//   // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
//   // So we're sending the user back the route to the home page because the redirect will happen on the front end
//   // They won't get this or even be able to access this page if they aren't authed
//   res.json("/create");
// });

app.post('/api/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}));

app.get('/login', function(req, res, next) {
  console.log("Login work?");
  var errors = req.flash('error');

  // req.flash('success', 'You can add messages by including a second parameter with the function.');
  
  // ... respond to the request ...
});



// Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
// how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
// otherwise send back an error
app.post("/api/signup", function(req, res) {
  //console.log("Got to /api/signup");
  console.log(req.body);
  User.save({
    fullname: req.body.fullname,
    email: req.body.email,
    password: req.body.password
  }).then(function() {
    res.json("/create");
    //res.redirect(307, "/create");
  }).catch(function(err) {
    console.log(" ");
    console.log("Signup error due to duplicate entry: " + err);
    console.log(" ");
    res.send("Error_duplicate_entry_Use_back_browser_arrow_to_return_to_Login_page");
    //res.send("/signup");
    //res.json(err);
    //res.status(422).json(err.errors[0].message);
  });
});

// THE BELOW ROUTE IS ONLY IF THE ABOVE NEW USER ROUTE DOESN'T WORK!!!!!
// Route to post our form submission to mongoDB via mongoose
app.post("/newuser", function(req, res) {
  // We use the "User" class we defined above to check our req.body against our user model
  var newUser = new User(req.body);
  // With the new "Example" object created, we can save our data to mongoose
  // Notice the different syntax. The magic happens in userModel.js
  newUser.save(function(error, doc) {
    // Send any errors to the browser
    if (error) { res.send(error); }
    // Otherwise, send the new doc to the browser
    else { res.send(doc); }
  });
});






// Route for logging user out
app.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/index");
});

// Route for getting some data about our user to be used client side
app.get("/api/user_data", function(req, res) {
  if (!req.user) {
    // The user is not logged in, send back an empty object
    res.json({});
  } else {
    // Otherwise send back the user's email and id
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      fullname: req.user.fullname,
      email: req.user.email,
      password: req.user.password,
      _id: req.user._id
    });
  }
});




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