const router = require('express').Router();
const User = require('../models/user');


const {
    registerUserData,
    loginUserData,
    
}=require('../controller/userRegistrationController');

router.post("/register",  registerUserData)
router.post("/loginUser",loginUserData)

  
    
  

module.exports = router;