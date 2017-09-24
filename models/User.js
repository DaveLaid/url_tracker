// Require mongoose
var mongoose = require("mongoose");
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
    ]
  },

  sites: [{
      type: Schema.Types.ObjectId,
      ref: "Site"
    }]

});


// Create the User model with the UserSchema
var User = mongoose.model("User", UserSchema);

// Export the models
module.exports = User;


