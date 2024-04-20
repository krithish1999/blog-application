const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config/config');

const authController = {
  async signup(req, res) {
    try {
      console.log(User);
      const { username, email, password } = req.body;
      console.log(req.body);
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log(hashedPassword);
      const user = await User.create({ username, email, password: hashedPassword });
      res.json({ user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  async login(req, res) {
    try {
      console.log(req);
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Incorrect password' });
      }
      const token = jwt.sign({ userId: user.id }, config.jwtSecret, { expiresIn: '1h' });
      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

module.exports = authController;
