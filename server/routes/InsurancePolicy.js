const express = require("express");     // import express
const router = express.Router();        // import express router 
const passport = require('passport')
const { InsurancePolicy , Employ} = require("../models"); // import  model
// const { checkedIfLoggedIn } = require("../middlewares/LoggedInMiddleware");
var Sequelize = require("sequelize");
const Employs = require("../models/Employs");
const User = require("../models/User");

router.get("/getPoliciesCompany", passport.authenticate('jwt', { session: false }),  async (req, res) => {
    // const policyList = await InsurancePolicy.findAll();

    let data = await Employ.findOne({
        where:{
            user_id: req.user.id
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



router.post('/addPolicy', passport.authenticate('jwt', { session: false }), async (req, res) => {

    try {
        let data = await Employ.findOne({
            where:{
                user_id: req.user.id
            },
            attributes: ['company_id']
        });
    
        if(data) {
            await InsurancePolicy.create({
                name: req.body.name,
                cover_amt: req.body.coverAmt,
                type: req.body.policyType,
                premium_per_month: req.body.premiumPM,
                premium_per_annum: req.body.premiumPA,
                company_id: data.company_id
            })
    
            res.status(200).send('Policy created successfully')
    
        } else {
            res.status(400).send({error: "Unauthorized access"})
        }
    } catch(e) {
        console.log(e)
        res.status(500).send({error: 'Internal Server Exception'})
    }
    

})

router.get("/getAllPolicies", passport.authenticate('jwt', { session: false }),  async (req, res) => {
    // const policyList = await InsurancePolicy.findAll();

    let policies = await InsurancePolicy.findAll({});
    res.json({data: policies});

});

module.exports = router;

