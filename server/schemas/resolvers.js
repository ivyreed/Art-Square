const { signToken } = require('../utils/auth');
const { User, Art } = require("../models");
const { AuthenticationError } = require('apollo-server');
const { artSchema } = require('../models/Art');
const cloudinary = require('cloudinary').v2;

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    getGalleryImages: async () => {
      const response = await cloudinary.search
        // .expression('tags:gallery-images')
        .sort_by('public_id', 'desc')
        .execute();

      const artImages = response.resources.map((resource) => ({
        public_id: resource.public_id,
        secure_url: resource.secure_url,
        tags: resource.tags,
        description: resource.context && resource.context.custom && resource.context.custom.description ? resource.context.custom.description : '',
        title: resource.context && resource.context.custom && resource.context.custom.title ? resource.context.custom.title : '',
      }));
      return artImages;
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      console.log("resolvers", username, email, password);
     const user = await User.create({ username, email, password });
      console.log(user);
      const token = signToken(user);

      return { token, user };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect Username");
      }

      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError("Incorrect Password");
      }
      const token = signToken(user);
      return { token, user };
    },
    addArt: async (parent, { secureUrl}) => {
      Art.create({
        description: 'description',
        artId: secureUrl,
        title: 'title',
      });
      return 'Good news everyone';
    }
  }
};
module.exports = resolvers;
