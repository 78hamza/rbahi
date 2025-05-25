const express = require('express');
const router = express.Router();
const { getProfile, updateProfile } = require('../controllers/profileController');

// get the user profile
router.get('/user/profile/:id', getProfile);

// put and update the user profile 
router.put('/user/profile/:id', updateProfile);


module.exports = router;
