var express = require("express");
const { userLogin, userSignup, UserLogout } = require("../Controller/user");
var router = express.Router();

/* GET users listing. */
router.post("/signup", userSignup);

/*********************** Login  */
router.post("/login", userLogin);

/**************** Logout  */
router.post("/logout", UserLogout);

module.exports = router;
