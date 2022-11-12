const express = require("express");     // import express
const router = express.Router();        // import express router 
const { InsurancePolicy } = require("../models"); // import  model
const passport = require('passport')
// const { checkedIfLoggedIn } = require("../middlewares/LoggedInMiddleware");
var Sequelize = require("sequelize");

router.get("/getPoliciesCompany", passport.authenticate('jwt', { session: false }),  async (req, res) => {
    const policyList = await InsurancePolicy.findAll();
    res.json({returnValue: policyList});

});

router.get('/addPolicy', async (req, res) => {

    res.json({})

})

 
module.exports = router;

