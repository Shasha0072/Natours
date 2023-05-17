const express = require('express');

const router = express.Router();

const tourController = require('../controllers/tourController');

//router.param('id', tourController.checkID);
// Create A checkBody Middleware
// Check if body coontains the name and price property
// if not , send 404
// add it to teh post handler stack
router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);

router.route('/tour-stats').get(tourController.getTourStats);
router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
