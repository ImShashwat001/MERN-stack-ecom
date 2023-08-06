const User = require("../models/user");

exports.getUserById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "No user was found in DB"
            })
        }
        // try { (err || !user)
        //     return res.status(400).json({
        //         error: "No user was found in DB"
        //     })

        // } catch {
        //     	console.log(error)
        // }
        req.profile = user;
        next();
    })
};

exports.getUser = (req, res) => {
    //TODO: get back here for password
    return res.json(req.profile)
}