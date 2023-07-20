const {check, validationResult } = require("express-validator");
const User = require("../models/user")


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


exports.signout = (req, res) => {
    res.json({
        message: "User signout"
    });
}
