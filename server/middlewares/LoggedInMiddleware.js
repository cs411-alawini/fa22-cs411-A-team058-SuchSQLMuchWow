const { verify } = require("jsonwebtoken");

const checkedIfLoggedIn = (req, res, next) => {
  const accessToken = req.header("accessToken");

  // invalid access token
    if (!accessToken) 
    {
        return res.status(401).send({ error: "User is not logged in." });

    }

    const validToken = verify(accessToken, "qwertyzxcvb");
    req.user = validToken;
    
    // excecute the function to be passed in
    if (validToken) {
        return next();
    }

};

module.exports = { checkedIfLoggedIn };