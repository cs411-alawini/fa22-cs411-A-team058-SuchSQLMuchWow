const express = require("express");     // import express
const router = express.Router();        // import express router 
const { SecurityQuestion, Tag, User} = require("../models"); // import  model
const db = require('../models')
const passport = require('passport')
const fs = require('fs')
const path = require('path')
const {QueryTypes} = require('sequelize')
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
  const [result, metadata] = await db.sequelize.query('SELECT ip.id, ip.name, COUNT(*) FROM Rating ra JOIN InsurancePolicy ip ON ra.InsurancePolicyId = ip.id WHERE ra.rating = (Select MAX(rating) FROM Rating) GROUP BY ra.InsurancePolicyId ORDER BY COUNT(*) DESC LIMIT 15')

  let modifiedResults = result.map(val => {
    return {name: val.name, id: val.id, count: val['COUNT(*)']}
  })

  res.send({data: modifiedResults})
})

router.get('/dashboard/getUserCountByState', passport.authenticate('jwt', { session: false }), async (req,res) => {

  const [result, metadata] = await db.sequelize.query('CALL users_by_state (:company_id)', {replacements: { company_id: 1000}, type: QueryTypes.SELECT})

  let data = {}
  Object.keys(result).forEach(key => {
    data[result[key].state] = result[key].user_count
  })

  res.json({data})

})

router.get('/dashboard/getPolicyCounts', passport.authenticate('jwt', { session: false }), async (req,res) => {

  const [result, metadata] = await db.sequelize.query('CALL get_policy_counts (:company_id)', {replacements: { company_id: 1000}, type: QueryTypes.SELECT})

  console.log(result)
  let data = {}
  Object.keys(result).forEach(key => {
    data[result[key].policy_type] = result[key].policy_count
  })

  res.json({data})

})

router.post('/dashboard/getRatingRange', passport.authenticate('jwt', { session: false }), async (req,res) => {

  const {rating} = req.body
  const [result, metadata] = await db.sequelize.query('CALL get_ratings_range (:company_id, :ratingValue)', {replacements: { company_id: 20, ratingValue: rating}, type: QueryTypes.SELECT})

  // console.log(result)
  let data = []
  Object.keys(result).forEach(key => {
    data.push(result[key].name)
  })

  console.log(data)

  res.json({data})

})

router.get('/dashboard/getSearchByMonth', passport.authenticate('jwt', { session: false }), async (req,res) => {

  const [result, metadata] = await db.sequelize.query('CALL get_search_count_by_month (:company_id)', {replacements: { company_id: 1000}, type: QueryTypes.SELECT})

  // console.log(result)
  let data = {}
  Object.keys(result).forEach(key => {
    data[result[key].ExecMonth] = result[key].MonthCount
  })

  console.log(data)

  res.json({data})

})

// router.get('/updateStates', async (req, res) => {

//   const users = await User.findAll()
//   let states = [ 'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY' ]
//   users.forEach(async (user) => {


//     await User.update({state: `${states[Math.floor(Math.random()*(states.length - 1))]}`}, {where: {id: user.id}})

//   })

//   res.send("OK")


// })

// router.get('/dashboard/usersInCoverAmountRange', passport.authenticate('jwt', { session: false }), async (req,res) => {

//   const [result, metadata] = await db.sequelize.query('SELECT DISTINCT u.email, u.state, u.first_name FROM UserActivity ua JOIN User u ON (ua.UserId = u.id) JOIN (SELECT id FROM InsurancePolicy WHERE cover_amt < 1000) AS temp ON (ua.InsurancePolicyId = temp.id)')

//   res.send({data: result})

// })


module.exports = router