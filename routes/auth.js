const express = require('express')


const router = express.Router();
const { signout, signup, signin, isSignedIn } = require("../controllers/auth");
const { check } = require('express-validator');
const { expressjwt: jwt } = require("express-jwt");



router.post("/signup",[

    check("name", "name should be at least 3 characters").isLength({ min: 3 }),
    check("email", "email is required").isEmail(),
    check("password", "password should be at least 3 chr").isLength({ min: 3 })

], signup);

router.post("/signin",[

    check("email", "email is required").isEmail(),
    check("password", "password field is required").isLength({ min: 1 })

], signin);



router.get("/signout", signout);


router.get('/testroute',isSignedIn , (req, res) => {
    res.json(req.auth); 
})

module.exports = router;