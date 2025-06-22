const mongoose = require('mongoose');
const User = require('../models/user');
const passport = require('passport');

const register = async(req, res) => {
    //validate message to insure all parameter are present
    if (!req.body.name || !req.body.email || !req.body.password ) {
        return res
            .status(400)
            .json({"message": "All fields required please"});
    }

    const user = new User({
        name: req.body.name, //set name
        email: req.body.email,  //set email
        password: '' // start with empty password
    });
    user.setPassword(req.body.password)  // set user password
    const q = await user.save();

    if(!q){
        //database returns with no data
        return res
            .status(400)
            .json(err);
    }
    else {
        //return new user token
        const token = user.generateJWT();
        return res  
            .status(200)
            .json(token);
            
    }
};

const login = (req, res) => {
    if(!req.body.email || !req.body.password){
        return res
            .status(400)
            .json({"message": "All fields required"});
    }

    passport.authenticate('local', (err, user, info) => {
        if(err) {
            return res
                .status(404)
                .json(err);
        }

        if(user) {
            const token = user.generateJWT();
            res
                .status(200)
                .json({token});
        }
        else{
            res
                .status(401)
                .json(info);
        }
    })(req, res);
};

module.exports = {
    register,
    login
};