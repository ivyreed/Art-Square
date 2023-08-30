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
  artUrl: {
    type: String,
    unique: true,
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
  ratings: [ 
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    value: Number
  }
],
});
// Created a virtuals to average ratngs 
artSchema.virtual('averageRating').get(function() {
  if (this.ratings && this.ratings.length > 0) {
    const total = this.ratings.reduce((acc, rating) => acc + rating.value, 0);
    return total / this.ratings.length;
  }
  return 0;
});

artSchema.set('toJSON', { virtuals: true });
const Art = model("Art", artSchema);

    module.exports = { Art, artSchema };
