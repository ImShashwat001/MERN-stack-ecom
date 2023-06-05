import mongoose from 'mongoose';
const { Schema } = mongoose;
const crypto = require('crypto');


// const userSchema = new Schema({

// })



const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxlength: 32,
    trim: true
  },
  lastName: {
    type: String,
    maxlength: 32,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true
  },
  userinfo: {
    type: String,
    trim: true
  },
   // TODO: Come back here
   encry_password: {
    type: String,
    required: true
   }, 
   salt: String, //use to safeguard password storage
   role: {
    type: Number,
    default: 0
   },
   purchases: {
    type: Array,
    default: []
   }
});

userSchema.method = {
  securePassword: function(plainpassword) {
    if (!password) return "";
    try {
      return crypto.createHmac('sha256', this.salt)
      .update(plainpassword)
      .digest('hex');
    } catch (err) {
        return "";
    }
  } 
}

module.exports = mongoose.model("User", userSchema )