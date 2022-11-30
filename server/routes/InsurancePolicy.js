const express = require("express");     // import express
const router = express.Router();        // import express router 
const passport = require('passport')
const { InsurancePolicy , Employ, Company,  PolicyType, PolicyTag, Tag} = require("../models"); // import  model
// const { checkedIfLoggedIn } = require("../middlewares/LoggedInMiddleware");
const { Op } = require("sequelize");

router.get("/getPoliciesCompany", passport.authenticate('jwt', { session: false }),  async (req, res) => {
    // const policyList = await InsurancePolicy.findAll();

    let data = await Employ.findOne({
        where:{
            UserId: req.user.id
        },
        attributes: ['CompanyId']
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
                UserId: req.user.id
            },
            attributes: ['CompanyId']
        });
    
        if(data) {
            let policy = await InsurancePolicy.create({
                name: req.body.name,
                cover_amt: req.body.coverAmt,
                type: req.body.policyType,
                premium_per_month: req.body.premiumPM,
                premium_per_annum: req.body.premiumPA,
                company_id: data.CompanyId
            })

            let tags = req.body.tags.map(val => {return {InsurancePolicyId: policy.id, TagId: val.id}})
            await PolicyTag.bulkCreate(tags)
    
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

    var policy = await InsurancePolicy.findOne({where: {isActive: true, id: policyId},include: [Company, PolicyType], raw: true});

    var policy_tags = await InsurancePolicy.findAll({where: {id: policy.id, isActive: true}, include: [Tag]})
    // console.log(policy_tags)
    let tags = policy_tags[0]['Tags'].map(tag => {return {id: tag.id, name: tag.name}})
    var data = {id: policy.id, type: policy['PolicyType.type'], name: policy.name, cover_amt: policy.cover_amt, premium_per_month: policy.premium_per_month, premium_per_annum: policy.premium_per_annum, isActive: policy.isActive, Company: {name: policy['Company.name']}, tags}



    // let filteredPolicies = policies.map(val => {
    //     return {id: val.id, type: val['PolicyType.type'], name: val.name, cover_amt: val.cover_amt, premium_per_month: val.premium_per_month, premium_per_annum: val.premium_per_annum, isActive: val.isActive, Company: {name: val['Company.name']}}
    // })
    res.json({data});

})

router.post("/getAllPolicies", passport.authenticate('jwt', { session: false }),  async (req, res) => {
    // const policyList = await InsurancePolicy.findAll();
    const {searchString, page, pageCount} = req.body

    if(searchString.length === 0) {

        var count = await InsurancePolicy.count({where: {isActive: true}})
        var policies = await InsurancePolicy.findAll({where: {isActive: true},include: [Company, PolicyType], raw: true, offset: (page-1)*pageCount, limit: pageCount});
    } else {
        var count = await InsurancePolicy.count({where: {name: {[Op.substring]: searchString}, isActive: true}})
        var policies = await InsurancePolicy.findAll({where: {name: {[Op.substring]: searchString}, isActive: true}, include: [Company, PolicyType], raw: true, offset: (page-1)*pageCount, limit: pageCount})
    }

    let filteredPolicies = []

    for(let val of policies) {
        var policy = await InsurancePolicy.findAll({where: {id: val.id, isActive: true}, include: [Tag]})
        let tags = policy[0]['Tags'].map(tag => {return {id: tag.id, name: tag.name}})
        filteredPolicies.push({id: val.id, type: val['PolicyType.type'], name: val.name, cover_amt: val.cover_amt, premium_per_month: val.premium_per_month, premium_per_annum: val.premium_per_annum, isActive: val.isActive, Company: {name: val['Company.name']}, tags})
        
    }

    // let filteredPolicies = policies.map((val) => {
    //     return {id: val.id, type: val['PolicyType.type'], name: val.name, cover_amt: val.cover_amt, premium_per_month: val.premium_per_month, premium_per_annum: val.premium_per_annum, isActive: val.isActive, Company: {name: val['Company.name']}, tags: }
    // })
    res.json({data: filteredPolicies, count});

});

router.put('/updatePolicy', passport.authenticate('jwt', { session: false }), async (req, res) => {

    try {
        const {id, name, cover_amt, premium_per_annum, premium_per_month, tags} = req.body

        await InsurancePolicy.update({name, cover_amt, premium_per_annum, premium_per_month}, {where: {id}});
        for(let tag of tags) {
            await PolicyTag.findOrCreate({where: {InsurancePolicyId: id, TagId: tag.id}})
        }

        res.status(200).send("Policy updated successfully")

    } catch(e) {
        console.log(e)
        res.status(500).send({error: "Internal Server Error"})
    }

})

router.delete('/deletePolicy/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        let policyId = req.params.id
    
        let company_id = (await Employ.findOne({where: {UserId: req.user.id}, attributes: ['CompanyId']})).CompanyId
    
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

