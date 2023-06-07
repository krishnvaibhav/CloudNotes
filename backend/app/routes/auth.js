const express = require("express");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcryptjs");
const {
  body,
  validationResult,
  ExpressValidator,
} = require("express-validator");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const fetchUser = require("../middleware/fetchUser");

dotenv.config({ path: "backend/app/.env.local" });

const JWT_TOKEN = process.env.JWT_TOKEN;
// Create a user using :POST "/api/auth/CreateUser/" . Doesn't require auth
// Route 1

router.post(
  "/CreateUser",
  [
    // Validation checks using express-validator
    body("email").isEmail(),
    body("name").isLength({ min: 5 }),
    body("password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        // If there are validation errors, return a response with the errors
        return res.status(400).json({ errors: errors.errors });
      }
      // Check if a user with the same email already exists
      let user = await User.findOne({
        email: req.body.email,
      });
      if (user) {
        // If user already exists, return an error response
        return res.status(400).json({ error: "This email id already exists" });
      }
      // If user doesn't exist, create a new user
      const Userobj = req.body;
      let { name, password, email } = Userobj; // Destructuring (In case needed)

      // Generating salt and Hashing the passwords
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      User.create({
        name: name,
        password: hashedPassword,
        email: email,
      })
        .then((user) => {
          // Send a JSON response with the created user
          const data = {
            user: {
              id: user.id,
            },
          };
          const authToken = jwt.sign(data, JWT_TOKEN);
          res.json({ authToken });
        })
        .catch((err) => {
          // If there's an error during user creation, send an error response
          res.status(400).send({
            error: err,
            message: err.message,
          });
        });
    } catch (error) {
      // If there's an error during the process, send a server error response
      res.status(500).send(error);
    }
  }
);

// Authenicate a user using :POST "/api/auth/AuthUser/" . Doesn't require auth
// Route 2

router.post(
  "/AuthUser",
  [body("email").isEmail(), body("password", "can not be blank").exists()],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          error: "Please login with valid credentials",
        });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({
          error: "Please login with valid credentials",
        });
      }

      // Validate the supplied user password

      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, process.env.JWT_TOKEN);

      res.json({ authToken });
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: "Internal Server Error" });
    }
  }
);

// Getting login info using :POST "/api/auth/GetUser/" . require auth
// Route 3

router.post("/GetUser", fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch {
    console.log("error");
  }
});

module.exports = router;
