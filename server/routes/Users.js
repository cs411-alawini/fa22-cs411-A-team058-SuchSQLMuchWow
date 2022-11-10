const bcrypt = require("bcrypt");       // import bcrypt for password hashing
const express = require("express");     // import express
const router = express.Router();        // import express router 
const { User } = require("../models"); // import users model
const { sign } = require("jsonwebtoken"); // import token
const { checkedIfLoggedIn } = require("../middlewares/LoggedInMiddleware");


router.post("/register", async (req, res) => {
    const { username, email, password, firstName, lastName, customerType, secQn, secAns, street, city, state, zipcode, gender, maritalStatus} = req.body;  

    const userToBeCreated = await Users.findOne({ where: { username: username } });

    if (userToBeCreated)
    {
      res.json({ error: "There is already an existing user with the same username. Please select a different username." });
      return;
    } 

    bcrypt.hash(password, 5).then((hashedPassword) => {
      bcrypt.hash(secAns, 5).then((hashedAns) => {
        Users.create({
          username: username,
          password: hashedPassword,
          email: email,        
          sec_qn: secQn,
          sec_ans: hashedAns,
          cust_type: customerType,
          first_name: firstName,
          last_name: lastName,
          street: street,
          city: city,
          state: state,
          zipcode: zipcode,
          gender: gender,
          marital_stat: maritalStatus,        

        }); })    
      res.json("User is created.");  
    });  

  });

router.put("/edit", checkedIfLoggedIn, async (req, res) => {
  const { username, email } = req.body;
  await Users.update ({username: username, email:email}, {where: {id: req.user.id}});
  res.json("Updated");  
});

router.post("/editpwsecqn", async (req, res) => {
  
    const userToChangePasword = await Users.findOne({ where: { email: req.body.email } });
    const { securityQuestion, securityAnswer, password, username, email } = req.body;    
    console.log(securityAnswer);

        bcrypt.compare(securityAnswer, userToChangePasword.sec_ans).then(async (correctSecAns) => {
          if (!correctSecAns) 
          {
            res.json({ error: "Incorrect security question's answer entered. Please re-enter the password." });
            return;
          }
          else
          {
            bcrypt.hash(password, 5).then((hashedValue) => {
              Users.update(
                { password: hashedValue },
                { where: { email: email  } }
              );      
              res.json("Updated Password"); 
            })
        }
      }
    );
  }
);

router.put("/editpassword", checkedIfLoggedIn, async (req, res) => {
  
  const { oldPassword, newPassword } = req.body;    
  const userToChangePassword = await Users.findByPk(req.user.id );                  

  // check if correct password
  bcrypt.compare(oldPassword, userToChangePassword.password).then(async (correctPassword) => {
    if (!correctPassword) 
    {
      res.json({ error: "Incorrect password entered. Please re-enter the password." });
      return;
    }
    bcrypt.hash(newPassword, 5).then((hashedValue) => {
      Users.update(
        { password: hashedValue },
        { where: { id: req.user.id  } }
      );      
      res.json("Updated Password");        
    });
  });   
});
  

router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const userToBeCreated = await Users.findOne({ where: { USERNAME: username } });

    try{
      if (!userToBeCreated)
      {
        res.json({ error: "This username is not found. Please re-enter the username." });
        return;
      } 
        
    // check if correct password
    bcrypt.compare(password, userToBeCreated.password).then(async (correctPassword) => {
      if (!correctPassword) 
      {
        res.json({ error: "Incorrect password entered. Please re-enter the password." });
        return;
      }
  
      // create access token to send it back to the client for further processing
      const accessToken = sign(
        { username: userToBeCreated.username, id: userToBeCreated.id },
        "qwertyzxcvb"
      );
      
      // return user name, id and access token for local storage in the front end
      res.json({ id: userToBeCreated.id, username: userToBeCreated.username, token: accessToken});
    });
    
    }
    catch(err)
    {
      res.json(err);
    }
    
  });

router.get("/getuserinfo/:id", checkedIfLoggedIn, async (req, res) => {
  
  const userInfo = await Users.findByPk(req.user.id);        

  if(!userInfo)
  {
    res.json({ error: "Fail to Retrieve User Info" });
  }

  res.json({
    username: userInfo.username,
    email: userInfo.email,
  })
      
});

router.get("/getsecqn/:emailRequested", async (req, res) => {
  
  console.log(req.params.emailRequested);

  const userWithThatEmail = await Users.findOne({ where: { email: req.params.emailRequested } });


  if(!userWithThatEmail)
  {
    res.json({ error: "Fail to Retrieve User Info" });
  }

  res.json({
    username: userWithThatEmail.username,
    email: userWithThatEmail.email,    
    secQn: userWithThatEmail.sec_qn,    
  })
      
});

router.get("/getusercount", async (req, res) => {
  
  const homeUserCount = await Users.findAll({ where: { cust_type: "H" } });
  const autoUserCount = await Users.findAll({ where: { cust_type: "A" } });
  const bothUserCount = await Users.findAll({ where: { cust_type: "B" } });

  res.json({
    homeUserCount: homeUserCount.length,    
    autoUserCount: autoUserCount.length,   
    bothUserCount: bothUserCount.length,    
 
  })
      
});


module.exports = router;