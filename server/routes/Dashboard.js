const express = require("express");     // import express
const router = express.Router();        // import express router 
const { InsurancePolicy , Employ, Company,  PolicyType} = require("../models"); // import  model
const db = require('../models')
// const { checkedIfLoggedIn } = require("../middlewares/LoggedInMiddleware");

router.get('/maxRatings', async (req,res) => {
    const [result, metadata] = await db.sequelize.query("SELECT ip.id, ip.name, ip.premium_per_annum, COUNT(*) as 'counts' FROM Rating ra JOIN InsurancePolicy ip ON ra.policy_id = ip.id WHERE ra.rating = (Select MAX(rating) FROM Rating) GROUP BY ra.policy_id ORDER BY COUNT(*) DESC LIMIT 15")

    let modifiedResults = results.map(val => {
        return {id: val.id, name: val.name, premium_per_annum: val.premium_per_annum, count: val['COUNT(*)']}
    })

    res.send({data: modifiedResults})
})


module.exports = router