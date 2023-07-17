const User = require("../models/user")


exports.signup = async (req, res) => {
    //created object user
    const user = new User(req.body);

    const savedUser = await user.save();

    if (savedUser) {
        res.json(savedUser);
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
