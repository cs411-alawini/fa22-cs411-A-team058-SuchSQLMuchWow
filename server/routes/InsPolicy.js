const express = require("express");     // import express
const router = express.Router();        // import express router 
const { InsurancePolicyModel } = require("../models"); // import  model
// const { checkedIfLoggedIn } = require("../middlewares/LoggedInMiddleware");
var Sequelize = require("sequelize");

router.get("/getpolicy", async (req, res) => {

    const policyList = await InsurancePolicyModel.findAll({ where: { UserId: req.user.id }});
    res.json({returnValue: policyList});

});

router.get('/addPolicy', async (req, res) => {

    res.json({})

})

 
module.exports = router;

