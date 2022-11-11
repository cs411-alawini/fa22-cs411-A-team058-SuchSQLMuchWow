const express = require("express");     // import express
const router = express.Router();        // import express router 
const { SecurityQuestion } = require("../models"); // import  model
// const { checkedIfLoggedIn } = require("../middlewares/LoggedInMiddleware");
var Sequelize = require("sequelize");

router.get("/getSecurityQuestions", async (req, res) => {

    const securityQuestions = await SecurityQuestion.findAll({
        attributes: ['id', 'question']
      });
    res.json({questions: securityQuestions});

});

module.exports = router