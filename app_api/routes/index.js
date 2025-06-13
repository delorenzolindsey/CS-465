const express = require("express"); //express app
const router = express.Router(); //router logic

//import controllor that we will route
const tripsController = require("../controllers/trips");
const { tripsFindByCode } = require("../controllers/trips");

//define route for trips endpoint
router 
    .route('/trips')
    .get(tripsController.tripsList) //GET method routes tripList
    .post(tripsController.tripsAddTrip); //POST methods adds a trip


    //Get method routes tripsFindByCode - requires parameter
router
    .route('/trips/:tripCode')
    .get(tripsFindByCode)
    .put(tripsController.tripsUpdateTrip);

module.exports = router;