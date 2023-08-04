const {check, validationResult } = require("express-validator");
const User = require("../models/user");
const Jwt = require('jsonwebtoken');
const { expressjwt: jwt } = require("express-jwt");
// import {check, validationResult } from "express-validator";
// import User from "../models/user";
// import jwt from "jsonwebtoken";
// import expressJwt from "express-jwt";

exports.signup = async (req, res) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(422).json({
            error:  errors.array()[0].msg
        })
    }

    //created object user
    const user = new User(req.body);

    const savedUser = await user.save();

    if (savedUser) {
        res.json({
            name: user.name,
            email: user.email,
            id: user._id
        });
    } else {
        res.status(400).json({
            err: "Not able to save user data in DB"
        })
    };
}

// exports.signin = async (req, res) => {
//     const errors = validationResult(req);

//     // destructuring req.body to get email and password
//     const {email, password } = await req.body;



//     try{
//         if(!errors.isEmpty()) {
//             return res.status(422).json({
//                 error:  errors.array()[0].msg
//             })
//         }
//     } catch(error) {
//         console.log(error);
//     }

    
// // searching in db to authenticate login

//     User.findById({ email }, (err, user) => {
    



        



//         if(err) {
//             res.statys(400).json({
//                 error: "USER email does not exist"
//             })
//         }
//         if(!user.authenticate(password)){
//             return res.status(401).json({
//                 error: "Email and password do not match"
//             })
//         }
//         //token

//         const token = jwt.signin({_id: user._id}, process.env.SECRET)

//         //put token in cookie
//         res.cookie("token, token, {expire: new Date() + 1200 }");

//         //send response to front end
//         const {_id, name, email, role} = user;
//         return res.json({token, user: {_id, name, email, role}})

//     })
// }



exports.signin = async (req, res) => {
    const errors = validationResult(req);
    const { email, password } = req.body;
  
    if (!errors.isEmpty()) {
      return res.status(422).json({
        error: errors.array()[0].msg
      });
    }
  
    await User.findOne({ email })
    .then((user, err) => {
      if (err || !user) {
        return res.status(400).json({
          error: "USER does not exist"
        });
      }

      if (!user.authenticate(password)) {
        return res.status(401).json({
          error: "Email and password do not match"
        });
      }
      const payload = {
        id: user._id,
        email: user.email
      }

      //create token
      const token = Jwt.sign(payload, process.env.SECRET, {expiresIn: 36000 });

      //if token is incorrect
      if(!token) {
        return res.status(500).json({
          error: "error signing token"
        });
      }

      //put token in cookie
      res.cookie("token", token,);
  
      //send response to front end
      const { _id, name, email, role } = user;
      return res.json({ token, user: { _id, name, email, role } });
    })
    .catch((error) => {
        return res.status(500).json({
            error: "An error occured while processing the request"
        })
    })
  };

  exports.signout = (req, res) => {
    
    // clearing cookie
    res.clearCookie("token");
    res.json({
        message: "Üser signed out successfully"
    })
  }

// protected routes
// we will not use nxt here because expressJWT already covered up next
// imported expressJwt in "jwt"
exports.isSignedIn = jwt({
   algorithms: ["HS256"],
    secret: process.env.SECRET,
    userProperty: "auth",  
})

//custom middlewares

exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id === req.auth._id;
  
  if(!checker) {
    return res.status(403).json({
      error: "ACCESS DENIED"
    });
  } 
  
  // next transfer control from one middleware to anther middleware
  next();
};


exports.isAdmin = (req, res, next) =>{
  if(req.profile.role === 0) {
    return res.status(403).json({
      error: "Not admin, Access denied."
    });
  }
  next();
}