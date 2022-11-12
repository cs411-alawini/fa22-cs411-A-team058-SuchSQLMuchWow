const express = require("express");     // import express
const router = express.Router();        // import express router 
const passport = require('passport')
const { InsurancePolicy , Employ, Company,  PolicyType} = require("../models"); // import  model
// const { checkedIfLoggedIn } = require("../middlewares/LoggedInMiddleware");
var Sequelize = require("sequelize");
const Employs = require("../models/Employs");
const User = require("../models/User");
const { Op } = require("sequelize");

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
            res.status(401).send({error: "Unauthorized access"})
        }
    } catch(e) {
        console.log(e)
        res.status(500).send({error: 'Internal Server Exception'})
    }

})

router.get('/getPolicy/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const policyId = req.params.id

    var policies = await InsurancePolicy.findAll({where: {isActive: true, id: policyId},include: [Company, PolicyType], raw: true});
    let filteredPolicies = policies.map(val => {
        return {id: val.id, type: val['PolicyType.type'], name: val.name, cover_amt: val.cover_amt, premium_per_month: val.premium_per_month, premium_per_annum: val.premium_per_annum, isActive: val.isActive, Company: {name: val['Company.name']}}
    })
    res.json({data: filteredPolicies});

})

router.post("/getAllPolicies", passport.authenticate('jwt', { session: false }),  async (req, res) => {
    // const policyList = await InsurancePolicy.findAll();
    const {searchString} = req.body

    if(searchString.length === 0) {
        var policies = await InsurancePolicy.findAll({where: {isActive: true},include: [Company, PolicyType], raw: true});
    } else {
        var policies = await InsurancePolicy.findAll({where: {name: {[Op.substring]: searchString}, isActive: true}, include: [Company, PolicyType], raw: true})
    }

    let filteredPolicies = policies.map(val => {
        return {id: val.id, type: val['PolicyType.type'], name: val.name, cover_amt: val.cover_amt, premium_per_month: val.premium_per_month, premium_per_annum: val.premium_per_annum, isActive: val.isActive, Company: {name: val['Company.name']}}
    })
    res.json({data: filteredPolicies});

});

router.put('/updatePolicy', passport.authenticate('jwt', { session: false }), async (req, res) => {

    try {
        const {id, name, cover_amt, premium_per_annum, premium_per_month} = req.body

        await InsurancePolicy.update({name, cover_amt, premium_per_annum, premium_per_month}, {where: {id}});

        res.status(200).send("Policy updated successfully")

    } catch(e) {
        console.log(e)
        res.status(500).send({error: "Internal Server Error"})
    }

})

router.delete('/deletePolicy/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        let policyId = req.params.id
    
        let company_id = (await Employ.findOne({where: {user_id: req.user.id}, attributes: ['company_id']})).company_id
    
        let policy = await InsurancePolicy.findOne({where: {id: policyId}})
    
        if(policy.company_id === company_id) {
            await InsurancePolicy.update({isActive: false}, {where: {id: policyId}})
            res.status(200).send('Policy deleted successfully')
        } else {
            res.status(401).send({error: 'Unauthorized access'})
        }
    } catch (e) {
        console.log(e)
        res.status(500).send({error: "Internal Server Error"})
    }

})

module.exports = router;

