// Main server entry point
const express = require('express');
const app = express();
const cors = require("cors");
const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const {User} = require('./models')

// Init cors and express json
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

// Init database
const db = require("./models");
app.use(express.static(__dirname));

passport.use(new JwtStrategy({jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), secretOrKey: 'SECRET_PASSWORD567463'}, async function(jwt_payload, done) {

    console.log(jwt_payload)

    try {
        let user = await User.findOne({where: {id: jwt_payload.user.id}, attributes: ['id', 'name', 'user_type', 'email']})
        if(user) {
            console.log(user)
            return done(null, user);
        } else 
            return done(null, false);
    } catch(e) {
        return done(e, false);
    }

    // User.findOne({where: {id: jwt_payload.user.id}}, function(err, user) {
    //     if (err) {
    //         return done(err, false);
    //     }
    //     if (user) {
    //         console.log(user)
    //         return done(null, user);
    //     } else {
    //         return done(null, false);
    //     }
    // });
}));





// Init routers
const routeUsers = require("./routes/Users");
app.use("/users", routeUsers);
const routeInsPolicy = require("./routes/InsurancePolicy");
app.use("/insurance", routeInsPolicy);
// const dashboardRouter = require("./routes/API")
// app.use('/api/dashboard', dashboardRouter)
const routeAPI = require("./routes/API")
app.use('/api', routeAPI)



// const routeHomeQuotes = require("./routes/HomeQuotes");
// app.use("/homequotes", routeHomeQuotes);
// const routeVehicleQuotes = require("./routes/vehicleQuotes");
// app.use("/vehiclequotes", routeVehicleQuotes);
// const routePurchasePolicy = require("./routes/PurchasePolicy");
// app.use("/purchasepolicy", routePurchasePolicy);

const port = process.env.PORT || 8888;

db.sequelize.sync({alter: true}).then(()=>{
    app.listen(port, () => {
        console.log("Server running on "+port);
    });
});

