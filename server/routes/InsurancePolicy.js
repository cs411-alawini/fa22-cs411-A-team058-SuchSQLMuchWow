const express = require("express");     // import express
const router = express.Router();        // import express router 
const { InsurancePolicy , Employ} = require("../models"); // import  model
// const { checkedIfLoggedIn } = require("../middlewares/LoggedInMiddleware");
var Sequelize = require("sequelize");
const Employs = require("../models/Employs");

router.get("/getPoliciesCompany", async (req, res) => {
    

    // const policyList = await InsurancePolicy.findAll();

    let data = await Employ.findOne({
        where:{
            user_id: (given)
        },
        attributes: ['company_id']
    });

    let policies = InsurancePolicy.findAll({
        where:{
            company_id: data.company_id
        }
    });
    res.json({returnValue: policies});

});



router.get('/addPolicy', async (req, res) => {


    res.json({})

})

 
module.exports = router;

