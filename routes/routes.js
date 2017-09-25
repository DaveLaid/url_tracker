var express = require("express");
var path = require("path");

var passport = require("../config/passport");
var User = require("../models/User.js");
var Site = require("../models/Site.js");


var apiRoutes = require("./apiRoutes");

var router = new express.Router();

// Use the apiRoutes module for any routes starting with "/api"
router.use("/api", apiRoutes);

// Otherwise send all other requests the index.html page
// React router will handle routing withing the app
router.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});




// Routes =============================================================
module.exports = function(app) {

// Bookmark Buddy home page
  app.get("/", function(req, res) {
    
      res.redirect("/index");

  });

  // Signup page
  app.get("/signup", function(req, res) {
   
      res.sendFile(path.join(__dirname, "../public/signup.html"));
 
  });

  // Login page
  app.get("/login", function(req, res) {
   
      res.sendFile(path.join(__dirname, "../public/login.html"));

  });




//-- api routes -----------------------------------------------

  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the add Flashcards page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the home page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    res.json("/create");
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








};



module.exports = router;
