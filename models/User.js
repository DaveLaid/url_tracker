// Require mongoose
var mongoose = require("mongoose");
// Create Schema class
var Schema = mongoose.Schema;

// Create user/site schema
var UserSchema = new Schema({
  
  fullname: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  category: {
    type: String,
    [{
    site: [{
      url: {
        type: String,
        required: true
      },
      title: {
        type: String
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
      dateAdded: new Date()

    }]}

  }]

});

// Create the User model with the UserSchema
var User = mongoose.model("User", UserSchema);

// Export the model
module.exports = User;

