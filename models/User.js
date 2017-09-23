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

  site: [{
    url: {
      type: String,
      required: true
    },
    title: {
      type: String
    },
    category: {
      type: String,
      default: "Undefined"
    },
    note: {
      type: String
    },
    screenshot: {
      type: String
    },
    logo: {
      type: String
    },
    dateAdded: {
      type: Date,
      default: Date.now
    },
    deleted: {
      type: Boolean,
      default: false
    }
  }]
  

});

// Create the User model with the UserSchema
var User = mongoose.model("User", UserSchema);

// Export the model
module.exports = User;

