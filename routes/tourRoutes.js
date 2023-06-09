const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

const tourController = require('../controllers/tourController');

//router.param('id', tourController.checkID);
// Create A checkBody Middleware
// Check if body contains the name and price property
// if not , send 404
// add it to teh post handler stack
router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);

router.route('/tour-stats').get(tourController.getTourStats);
router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);

router
  .route('/')
  .get(authController.protect, tourController.getAllTours)
  .post(tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.deleteTour
  );

module.exports = router;
