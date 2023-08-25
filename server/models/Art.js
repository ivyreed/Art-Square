const { Schema } = require('mongoose');

const artSchema = new Schema({
  creators: [
    {
      type: String,
    },
  ],
  description: {
    type: String,
    required: true,
  },
  artId: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = artSchema;
