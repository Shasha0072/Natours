const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  review: {
    type: String,
    required: [true, 'Review can not be empty.'],
  },
  rating: { type: Number, min: 1, max: 5 },
  createdAt: { type: Date, default: Date.now },
  tourId: { type: mongoose.Schema.ObjectId },
  userId: { type: mongoose.Schema.ObjectId },
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;