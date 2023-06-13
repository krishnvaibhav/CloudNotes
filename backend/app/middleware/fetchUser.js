const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: "backendapp.env.local" });
const JWT_TOKEN = "mykey";

const fetchUser = (req, res, next) => {
  // get user from jwt_token
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "please authenticate" });
  }
  try {
    const data = jwt.verify(token, JWT_TOKEN);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ error });
  }
};

module.exports = fetchUser;
