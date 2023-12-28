const express = require('express');
const tourController = require('../controllers/tourController');
// Could also use object destructuring e.g.
// const {getAllTours, createTour, ...} = tourController

const router = express.Router();

// Create a param middlewhere that only gets executed when a given parameter
// is present in the request url
// router.param('id', tourController.checkID);

// Add custom route for common requests (Aliasing)
// Do this be creating a middleware to alter the req.query object
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
