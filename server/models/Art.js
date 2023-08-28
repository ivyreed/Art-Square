const { model, Schema } = require('mongoose');

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
const Art = model("Art", artSchema);

    module.exports = { Art, artSchema };
