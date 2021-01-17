const User = require('../../models/User');
const validate = require('../../validation/joi-register')
const validateLogin = require('../../validation/joi-login')
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");


//Load User mode

//@route GET api/users/test
//@desc test user route
//@access  public
router.get("/test", (req, res) =>
  res.json({
    msg: "Users works",
  })
);

//@route GET api/users/register
//@desc register user
//@access  public

router.post("/register", async (req, res) => {

    const { error } = validate(req.body)
if (error) {
  return res.status(400).send(error.details[0].message);
}
 //check if user already existed
  const user = await User.findOne({email: req.body.email});
    if (user) {
      return res.status(400).json({
        email: "user already existed",
      });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      //hash password
      const salt = await bcrypt.genSalt(10); 
       newUser.password = await bcrypt.hash(newUser.password, salt);
       await newUser.save();
      res.json({
        name:req.body.name, 
        email: req.body.email
      })
    }
  });

//@route GET api/users/login
//@desc register user
//@access  public

router.post("/login", async (req, res) => {

  const email = req.body.email;
  const password = req.body.password;

  const {error} = validateLogin(req.body)
  if (error) {
    return res.status(400).send(error.message);
  }

  //Find user by emaill
  user = await User.findOne({email})
    // Check for user
    if (!user) {
      return res.status(404).json({
        email: "user not found",
      });
    }
    // check password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        // user marched
        const payload = {
          id: user.id,
          name: user.name,
          email: user.email,
        }; //create jwt payload

        //Sign Token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 3600,
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
            });
          }
        );
      } else {
        return res.status(400).json({
          password: "Password incorrect",
        });
      }
    });
  });
//@route GET api/users/current
//@desc register current user
//@access  private
router.get(
  "/current",
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
    });
  }
);

module.exports = router;
