const Review = require('../models/reviewModel');
const catchAsync = require('../utils/catchAsync');

exports.getAllReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.find();
  res.status(200).json({
    status: 'success',
    results: reviews.length,
    data: {
      reviews,
    },
  });
});

exports.createReview = catchAsync(async (req, res, next) => {
  const reviewData = req.body;
  const newReview = await Review.create(reviewData);
  res.status(200).json({
    status: 'success',
    data: {
      newReview,
    },
  });
});
