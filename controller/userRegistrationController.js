const User = require('../models/user');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const registerUserData = async (req, res) => {
  const { username, password } = req.body;
  try {
      const newUser = await User.create({ username, password });
      res.json({ message: 'Signup successful', user: newUser });
  } catch (error) {
      res.status(500).json({ error: 'Error creating user' });
  }
};


const loginUserData = async (req, res) => {
  const token = jwt.sign({ sub: req.user._id }, 'apple', { expiresIn: '1h' });
  res.cookie('nToken', token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });
  res.json({ message: 'Login successful', token });
};

module.exports = {
  registerUserData,
  loginUserData
}

