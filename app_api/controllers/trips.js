const mongoose = require('mongoose');
const Trip = require('../models/travlr'); //registers the model
const Model = mongoose.model('trips');

//GET trips - ALL of the trips
//Regardless of the outcome, must include the HTML
//and json message to the client requesting
const tripsList = async (req, res) => {
  const q = await Model.find({}) // No filter, return all records
    .exec();

  // console.log(q);

  if (!q) {
    // Database returned no data
    return res.status(404).json(err);
  } else {
    // Return resulting trip list
    return res.status(200).json(q);
  }
};

//GET trips - ONE of the trips
//Regardless of the outcome, must include the HTML
//and json message to the client requesting
const tripsFindByCode = async(req, res) => {
    const q = await Model
        .find({'code' : req.params.tripCode }) // return single record
        .exec();

        //uncomment the following line to show the query results
        //on the console
        //console.los(q);

    if(!q){
        //database returns no data
        return res
            .status(404)
            .json(err);
    }
    else{
        // return the trip list
        return res
            .status(200)
            .json(q);
    }
};

module.exports = {
    tripsList,
    tripsFindByCode
};