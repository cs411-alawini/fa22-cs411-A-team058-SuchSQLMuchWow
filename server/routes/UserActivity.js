const express = require("express");     // import express
const router = express.Router();        // import express router 
const { UserActivity } = require("../models"); // import  model
const db = require('../models')
const passport = require('passport')
// const { checkedIfLoggedIn } = require("../middlewares/LoggedInMiddleware");

router.post('/addUserActivity', passport.authenticate('jwt', { session: false }), async (req, res) => {

    try {
        const {policyId, searchString} = req.body
        const userId = req.user.id 
    
        await UserActivity.create({
            user_id: userId,
            policy_id, policyId,
            search_string: searchString
        })
    
        res.status(200).send("User Activity added successfully")
    } catch(e) {
        console.log(e)
        res.status(401).send('Internal server error')
    }

})

module.exports = router