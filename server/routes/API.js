const express = require("express");     // import express
const router = express.Router();        // import express router 
const { SecurityQuestion, Tag } = require("../models"); // import  model
const db = require('../models')
const passport = require('passport')
// const { checkedIfLoggedIn } = require("../middlewares/LoggedInMiddleware");
// const dashboardRouter = require('./Dashboard')

// express().use('/dashboard', dashboardRouter)

router.get("/getSecurityQuestions", async (req, res) => {

    const securityQuestions = await SecurityQuestion.findAll({
        attributes: ['id', 'question']
      });
    res.json({questions: securityQuestions});

});

router.get("/getTags", async (req, res) => {
  const tags = await Tag.findAll({ attributes: ['id', 'name'], where: {isActive: true}})

  res.status(200).send({tags})
})

router.get('/dashboard/maxRatings', passport.authenticate('jwt', { session: false }), async (req,res) => {
  const [result, metadata] = await db.sequelize.query('SELECT ip.id, ip.name, COUNT(*) FROM Rating ra JOIN InsurancePolicy ip ON ra.policy_id = ip.id WHERE ra.rating = (Select MAX(rating) FROM Rating) GROUP BY ra.policy_id ORDER BY COUNT(*) DESC LIMIT 15')

  let modifiedResults = result.map(val => {
    return {name: val.name, id: val.id, count: val['COUNT(*)']}
  })

  res.send({data: modifiedResults})
})

router.get('/dashboard/usersInCoverAmountRange', passport.authenticate('jwt', { session: false }), async (req,res) => {

  const [result, metadata] = await db.sequelize.query('SELECT DISTINCT u.email, u.state, u.first_name FROM UserActivity ua JOIN User u ON (ua.user_id = u.id) JOIN (SELECT id FROM InsurancePolicy WHERE cover_amt < 1000) AS temp ON (ua.policy_id = temp.id)')

  res.send({data: result})

})


module.exports = router