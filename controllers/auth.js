const User = require("../models/user")




exports.signup = (req, res) => {
    //created object user
    const user = new User(req.body);
    user.save().then((err, user) => {
        if(err) {
            return res.status(400).json({
                err: "Not able to save user in DB"
            })
        }
        res.json(user);
    });
};


exports.signout = (req, res) => {
    res.json({
        message: "User signout"
    });
}
