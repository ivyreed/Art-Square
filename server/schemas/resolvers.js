const { signToken } = require("../utils/auth");
const { User, Art } = require("../models");
const { AuthenticationError } = require("apollo-server");
// const { artSchema } = require('../models/Art');
const cloudinary = require("cloudinary").v2;

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
        .sort_by("created_at", "desc")
        .execute();

      const artData = response.resources.map((resource) => ({
        public_id: resource.public_id,
        secure_url: resource.secure_url,
        tags: resource.tags,
        description:
          resource.context &&
          resource.context.custom &&
          resource.context.custom.description
            ? resource.context.custom.description
            : "",
        title:
          resource.context &&
          resource.context.custom &&
          resource.context.custom.title
            ? resource.context.custom.title
            : "",

        averageRating: 0,
      }));

      for (let art of artData) {
        const artworkInDB = await Art.findOne({ artUrl: art.secure_url });
        if (artworkInDB) {
          art.averageRating = artworkInDB.averageRating;
        } else {
          console.error("Artwork not found for the provided URL");
        }
      }

      return artData;
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

    addArt: async (parent, { secureUrl }, context) => {
      const newArt = await Art.create({
        description: "hello",
        artUrl: secureUrl,
        title: "howdy",
      });
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $push: { art: newArt } },
          { new: true, runValidators: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    addRatingToArt: async (_, { artUrl, ratingValue }, context) => {
      if (!context.user || !context.user._id) {
        throw new AuthenticationError(
          "You need to be logged in to rate the art pieces"
        );
      }

      try {
        const artwork = await Art.findOne({ artUrl: artUrl });
        if (!artwork) {
          throw new Error("Artwork not found");
        }

        // Validation point for checking if user has already rated an art piece
        const userRatingIndex = artwork.ratings.findIndex((rating) => {
          if (!rating.user) {
            console.warn("Found a rating without a user:", rating);
            return false;
          }
          return rating.user.toString() === context.user._id.toString();
        });

        if (userRatingIndex !== -1) {
          throw new Error("You have already rated this artwork");
        }

        artwork.ratings.push({ user: context.user._id, value: ratingValue });
        await artwork.save();

        return artwork;
      } catch (error) {
        console.error("Error in addRatingToArt:", error);
        throw new Error(error.message);
      }
    },
  },
};

module.exports = resolvers;
