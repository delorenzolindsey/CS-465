const express = require("express"); //express app
const router = express.Router(); //router logic

const jwt = require('jsonwebtoken'); //enable web tokens

//method for authenticate JWT
function authenticateJWT(req, res, next){
    // console.log('In Middleware')

    const authHeader = req.headers['authorization'];
    // console.log('Auth Header: ' + authHeader);

    if(authHeader == null){
        console.log('Auth Header Required but NOT PRESENT!');
        return res.sendStatus(401);
    }

    let headers = authHeader.split(' ');

    if(headers.length < 1){
        console.log('Not enough tokens in Auth Header: ' + headers.length);
        return res.sendStatus(501);
    }

    const token = authHeader.split(' ')[1];
    // console.log('Token: ' + token);

    if(token == null){
        console.log('Null Bearer Token');
        return res.sendStatus(401);
    }

    // console.log(process.env.JWT_SECRET);
    // console.log(jwt.decode(token));
    const verifed = jwt.verify(token, process.env.JWT_SECRET, (err, veriftied) =>{
        if(err){
            return res.sendStatus(401).json('Token Validation Error!');
        }
        req.auth = verifed; //set auth parameter to decoded
    });
    next();
}

//import controllor that we will route
const tripsController = require("../controllers/trips");
const authController = require("../controllers/authentication");


//define the route for  register
router
    .route("/register")
    .post(authController.register);

router
    .route("/login")
    .post(authController.login);

//define route for trips endpoint
router 
    .route("/trips")
    .get(tripsController.tripsList) //GET method routes tripList
    .post(authenticateJWT, tripsController.tripsAddTrip); //POST methods adds a trip


    //Get method routes tripsFindByCode - requires parameter
router
    .route("/trips/:tripCode")
    .get(tripsController.tripsFindByCode)
    .put(authenticateJWT, tripsController.tripsUpdateTrip);

module.exports = router;