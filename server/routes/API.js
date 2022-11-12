const express = require("express");     // import express
const router = express.Router();        // import express router 
const { SecurityQuestion } = require("../models"); // import  model
const db = require('../models')
// const { checkedIfLoggedIn } = require("../middlewares/LoggedInMiddleware");
// const dashboardRouter = require('./Dashboard')

// express().use('/dashboard', dashboardRouter)

router.get("/getSecurityQuestions", async (req, res) => {

    const securityQuestions = await SecurityQuestion.findAll({
        attributes: ['id', 'question']
      });
    res.json({questions: securityQuestions});

});

router.get('/dashboard/maxRatings', async (req,res) => {
  const [result, metadata] = await db.sequelize.query('SELECT ip.id, ip.name, ip.premium_per_annum, COUNT(*) FROM Rating ra JOIN InsurancePolicy ip ON ra.policy_id = ip.id WHERE ra.rating = (Select MAX(rating) FROM Rating) GROUP BY ra.policy_id ORDER BY COUNT(*) DESC LIMIT 15')

  console.log(result)
})


module.exports = router