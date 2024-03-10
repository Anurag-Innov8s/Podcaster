const express = require('express');
const { signin, signup, logout, update, updatePassword,findUserByEmail } = require('../controllers/user');
const {isAuthenticated} = require('../middleware/auth')

const router = express.Router();

router.post("/signup",signup);
router.post("/login",signin);
router.route("/logout").get(isAuthenticated,logout);
router.route("/update").put(isAuthenticated,update);
router.route("/updatePassword").put(isAuthenticated,updatePassword);
router.route("/findUserByEmail").get(isAuthenticated,findUserByEmail)
module.exports = router;