const passport = require('passport');
const User = require('../models/user');


// Controller function to handle user registration
async function registerUser(req, res) {
  const { username, password } = req.body;

  try {
    // Check if the username is already taken
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Create a new user document and save it to the database
    const newUser = new User({ username });
    await newUser.setPassword(password);
    await newUser.save();

    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Controller function to handle user login
function loginUser(req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      return res.json({ message: 'Login successful' });
    });
  })(req, res, next);
}

// Controller function to handle user logout
function logoutUser(req, res) {
  req.logout();
  res.json({ message: 'Logout successful' });
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};