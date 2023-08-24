const { User } = require('../models');
const { signToken } = require('../utils/auth');

module.exports = {
  async getSingleUser({ user = null, params }, res) {
    try {
      const locatedUser = await User.findOne({
        $or: [{ _id: user ? user._id : params.id }, { username: params.username }],
      });

      if (!locatedUser) {
        return res.status(404).json({ message: 'User not found!' });
      }
      res.status(200).json(locatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  },

  async createUser({ body }, res) {
    try {
      const user = await User.create(body);
      const token = signToken(user);
      res.status(201).json({ token, user });
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: 'Failed to create user' });
    }
  },

  async login({ body }, res) {
    try {
      const user = await User.findOne({ $or: [{ username: body.username }, { email: body.email }] });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const correctPw = await user.isCorrectPassword(body.password);

      if (!correctPw) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = signToken(user);
      res.status(200).json({ token, user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  },
}