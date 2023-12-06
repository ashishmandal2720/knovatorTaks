const router = require('express').Router();
const User = require('../models/user');
const passport = require('passport');

const {
    registerUserData,
    loginUserData,

} = require('../controller/userRegistrationController');

router.post("/register", registerUserData)
router.post("/loginUser", passport.authenticate('local', { session: false }), loginUserData)





module.exports = router;