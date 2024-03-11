const express = require('express');
const { signin, signup, logout, update, updatePassword,findUserByEmail, getUser, generateOTP } = require('../controllers/user');
const {isAuthenticated} = require('../middleware/auth')

const localVariables = require('../middleware/auth2')

const router = express.Router();




router.post("/signup",signup);
router.post("/login",signin);
router.route("/logout").get(isAuthenticated,logout);
router.route("/update").put(isAuthenticated,update);
router.route("/updatePassword").put(isAuthenticated,updatePassword);
router.route("/findUserByEmail").get(isAuthenticated,findUserByEmail);
router.route("/").get(isAuthenticated,getUser);
router.route("/generateotp").get(localVariables,generateOTP)


module.exports = router;