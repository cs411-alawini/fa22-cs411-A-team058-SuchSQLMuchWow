// Main server entry point
const express = require('express');
const app = express();
const cors = require("cors");

// Init cors and express json
app.use(cors());
app.use(express.json());

// Init database
const db = require("./models");
app.use(express.static(__dirname));

// Init routers
const routeUsers = require("./routes/Users");
app.use("/users", routeUsers);
const routeInsPolicy = require("./routes/InsurancePolicy");
app.use("/insurance", routeInsPolicy);



// const routeHomeQuotes = require("./routes/HomeQuotes");
// app.use("/homequotes", routeHomeQuotes);
// const routeVehicleQuotes = require("./routes/vehicleQuotes");
// app.use("/vehiclequotes", routeVehicleQuotes);
// const routePurchasePolicy = require("./routes/PurchasePolicy");
// app.use("/purchasepolicy", routePurchasePolicy);

const port = process.env.PORT || 5000;

db.sequelize.sync({alter: true}).then(()=>{
    app.listen(port, () => {
        console.log("Server running on "+port);
    });
});

