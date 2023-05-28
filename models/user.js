import mongoose from 'mongoose';
const { Schema } = mongoose;


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
   password: {
    type: String,
    trim: true
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

module.exports = mongoose.model("User", userSchema )