import mongoose from 'mongoose';
const { Schema } = mongoose;
const crypto = require('crypto');
import { v1 as uuidv1 } from 'uuid';


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
}, { timestamps: true });

userSchema.virtual("password")
  .set(function(password) {
      this._password = password // _password is a private variable I created
      this.salt = uuidv1();
      this.encry_password = this.securePassword(password);
  })
  .get(function() {
    return this.password
  })

userSchema.methods = {

  authenticate: function(plainpassword) {
    return this.securePassword(plainpassword) === this.encry_password
  },

  securePassword: function(plainpassword) {
    if (!plainpassword) return "";
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