// Require mongoose
var mongoose = require("mongoose");
// Require password-hash
var Hash = require('password-hash');
// Create Schema class
var Schema = mongoose.Schema;

// Create user/site schema
var UserSchema = new Schema({
  
  fullname: {
    type: String,
    trim: true,
    required: "Full Name field is required."
  },

  email: {
    type: String,
    required: "E-mail is required.",
    unique: true,
    match: [/.+\@.+\..+/, "Please enter a valid e-mail address"]
  },

  password: {
    type: String,
    trim: true,
    required: "Password is required.",
    validate: [
      function(input) {
        return input.length >= 6;
      },
      "Password should be at least 6 characters."
    ],
    set: function(newValue) {
    return Hash.isHashed(newValue) ? newValue : Hash.generate(newValue);}
  },

  sites: [{
      type: Schema.Types.ObjectId,
      ref: "Site"
    }]

});


UserSchema.statics.authenticate = function(email, password, callback) {
  this.findOne({ email: email }, function(error, user) {
    if (user && Hash.verify(password, user.password)) {
      callback(null, user);
    } else if (user || !error) {
      // Email or password was invalid (no MongoDB error)
      error = new Error("Your email address or password is invalid. Please try again.");
      callback(error, null);
    } else {
      // Something bad happened with MongoDB. You shouldn't run into this often.
      callback(error, null);
    }
  });
};

// Create the User model with the UserSchema
var User = mongoose.model("User", UserSchema);

// Export the models
module.exports = User;


