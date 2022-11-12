const bcrypt = require("bcrypt");       // import bcrypt for password hashing
const express = require("express");     // import express
const router = express.Router();        // import express router 
const { User } = require("../models"); // import users model
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');

async function isValidPassword(hashedPassword, password) {
  let result = await bcrypt.compare(password, hashedPassword)
  if(result)
      return true
  
  return false
} 

passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    session: false
  },
  async (email, password, done) => {
    try {
      const user = await User.findOne({ where: { email } , attributes: ['email', 'id', 'user_type', 'password']});

      if (!user) {
        return done(null, false, { message: 'User not found' });
      }

      const validate = await isValidPassword(user.password, password);

      if (!validate) {
        return done(null, false, { message: 'Wrong Password' });
      }

      return done(null, user, { message: 'Logged in Successfully' });
    } catch (error) {
      return done(error);
    }
  }
)
);





router.post("/register", async (req, res) => {
    const { email, password, firstname, lastname, securityQuestion, securityAns, city, state, zip, middlename, country} = req.body;
    
    console.log(req.body)

    try {

      const userToBeCreated = await User.findOne({ where: { email: email } });
  
      if (userToBeCreated)
      {
        res.status(500).send({ error: "This Account is already existing. Please Log in to continue" })
        return;
      } 
  
      let hashedPassword = await bcrypt.hash(password, 5)
      let hashedAns = await  bcrypt.hash(securityAns, 5)
  
      let user = User.create({
        name: `${firstname} ${middlename} ${lastname}`,
        password: hashedPassword,
        email,    
        security_question: securityQuestion,
        security_answer: hashedAns,
        first_name: firstname,
        last_name: lastname,
        middle_name: middlename,
        city,
        state,
        country,
        zip,
        marital_status: 'Single',
        user_type: 2
  
      })
      res.json("User is created.");  

    } catch(e) {
      console.log(e)
    }


  });

// router.put("/edit", checkedIfLoggedIn, async (req, res) => {
//   const { username, email } = req.body;
//   await Users.update ({username: username, email:email}, {where: {id: req.user.id}});
//   res.json("Updated");  
// });

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

// router.put("/editpassword", checkedIfLoggedIn, async (req, res) => {
  
//   const { oldPassword, newPassword } = req.body;    
//   const userToChangePassword = await Users.findByPk(req.user.id );                  

//   // check if correct password
//   bcrypt.compare(oldPassword, userToChangePassword.password).then(async (correctPassword) => {
//     if (!correctPassword) 
//     {
//       res.json({ error: "Incorrect password entered. Please re-enter the password." });
//       return;
//     }
//     bcrypt.hash(newPassword, 5).then((hashedValue) => {
//       Users.update(
//         { password: hashedValue },
//         { where: { id: req.user.id  } }
//       );      
//       res.json("Updated Password");        
//     });
//   });   
// });
  

router.post('/login', async (req, res, next) => {
    passport.authenticate(
      'local',
      async (err, user, info) => {
        try {
          if (err || !user) {
            return res.status(500).send({error: 'Invalid email or password.'})
          }

          req.login(
            user,
            { session: false },
            async (error) => {
              if (error) return next(error);

              const body = { id: user.id, email: user.email, role: user.user_type };
              const token = jwt.sign({ user: body }, 'SECRET_PASSWORD567463', {expiresIn: '1 days'});

              return res.json({ token, role: user.user_type});
            }
          );
        } catch (error) {
          return next(error);
        }
      }
    )(req, res, next);
  }
);

// router.get("/getuserinfo/:id", checkedIfLoggedIn, async (req, res) => {
  
//   const userInfo = await Users.findByPk(req.user.id);        

//   if(!userInfo)
//   {
//     res.json({ error: "Fail to Retrieve User Info" });
//   }

//   res.json({
//     username: userInfo.username,
//     email: userInfo.email,
//   })
      
// });

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