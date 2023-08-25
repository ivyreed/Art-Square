const { Art } = require("../models");
const { signToken } = require("../utils/auth");

module.exports = {
  async getAllArtForUser({ user }, res) {
    try {
      const userArt = await Art.find({
        creators: user.username,
      });

      res.status(200).json(userArt);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  async getAllArtForGallery(req, res) {
    try {
      const allArt = await Art.find();
      res.status(200).json(allArt);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
}