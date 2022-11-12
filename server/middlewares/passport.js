const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt')

const { User } = require('../models')


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