exports.signup = (req, res) => {
    console.log("REQ BODY", req.body);
    res.json({
        message: "Signup route Works!"
    })
};


exports.signout = (req, res) => {
    res.json({
        message: "User signout"
    });
}
