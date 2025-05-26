const express = require('express');
const router = express.Router();
const { getProfile, updateProfile, changePassword } = require('../controllers/profileController');

// get the user profile
router.get('/user/profile/:id', getProfile);

// put and update the user profile 
router.put('/user/profile/:id', updateProfile);

// updater the user password 
router.put('/user/profile/password-change/:id', changePassword)


module.exports = router;
