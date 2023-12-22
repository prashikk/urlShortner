const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const Url = require('../models/url');

const passport = require('passport');
const User = require('../models/user');


router.post('/register', async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Validate input
      if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required.' });
      }
  
      // Check if the username is already taken
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ error: 'Username is already taken.' });
      }
  
      // Create a new user
      const newUser = new User({ username });
      await newUser.setPassword(password);
      await newUser.save();
  
      // Log in the user after registration
      req.login(newUser, (err) => {
        if (err) {
          return res.status(500).json({ error: 'Internal Server Error' });
        }
  
        return res.status(201).json({ message: 'User registered and logged in successfully.' });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

// User Login Endpoint
router.post('/login', passport.authenticate('local'), (req, res) => {
    res.json({ message: 'Login successful.' });
  });
  
  // Logout Endpoint
  router.get('/logout', (req, res) => {
    req.logout();
    res.json({ message: 'Logout successful.' });
  });
  

module.exports = router;
