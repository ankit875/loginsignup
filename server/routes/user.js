const express = require('express');
const router = express.Router();

const { login, signup,forgot,resetPassword } = require('./../controllers/user');

router.post('/signup',signup);
router.post('/signin',login);
router.post('/forgot',forgot);
router.post('/resetpassword', resetPassword)

module.exports = router;