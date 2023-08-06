const express = require('express');
const router = express.Router();

const {getUserById, getUser} = require("../controllers/user");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");

router.param("user_id", getUserById);

router.get("/user/:user_id",isSignedIn,isAuthenticated, getUser);

module.exports = router;