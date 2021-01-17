const validate = require('../../validation/joi-login')
const validateProfile = require('../../validation/joi-profile')

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//Load profile model
const Profile = require('../../models/Profile');

//Load User model
const User = require('../../models/User');



//@route GET api/profile/test
//@desc test profile route
//@access  public
router.get('/test', (req, res) => res.json({
  msg: "Profile works"
}));

//@route GET api/profile
//@desc  Get current user profile route
//@access  private

router.get("/", passport.authenticate("jwt", {
  session: false
}), async (req, res) => {
  const errors = {}
  const profile = await Profile.findOne({
    user: req.user.id
  }).populate('user', ['name', 'email'])
  try {
    if (!profile) {
      errors.noprofile = 'There is no profile for this user'
      return res.status(404).json(errors)
    }
    res.json(profile);
  } catch (error) {
    res.status(404).json(error)
  }
})

//@route GET api/profile/handle/:handle
//@desc Get profile by handle
//@access  public

router.get('/handle/:handle', async (req, res) => {
  const profile = await Profile.findOne({
      handle: req.params.handle
    })
    .populate('user', ['name', 'email'])
  try {

    errors = {}
    if (!profile) {
      errors.noprofile = 'There is no profile for this handle';
      res.status(404).json(errors)
    }
    res.json(profile)
  } catch (error) {
    res.status(404).json(error)
  }
})


//@route GET api/profile/user/:user_id
//@desc Get profile by user ID
//@access  public

router.get('/user/:user_id', async (req, res) => {
  const profile = await Profile.findOne({
      handle: req.params.user_id
    })
    .populate('user', ['name', 'email'])
  try {

    errors = {}
    if (!profile) {
      errors.noprofile = 'There is no profile for this user';
      res.status(404).json(errors)
    }
    res.json(profile)
  } catch (error) { 
    res.status(404).json(error)
  }
})

//@route POST api/profile/test
//@desc user profile
//@access  Private

router.post("/", passport.authenticate("jwt", {
  session: false
}), async (req, res) => {
  const {
    error
  } = validateProfile(req.body)
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  // Get field
  const profileFields = {};
  profileFields.user = req.user.id;

  if (req.body.handle) profileFields.handle = req.body.handle;
  if (req.body.company) profileFields.handle = req.body.company;
  if (req.body.website) profileFields.website = req.body.website;
  if (req.body.location) profileFields.location = req.body.location;
  if (req.body.status) profileFields.status = req.body.status;
  if (req.body.githubusername) profileFields.githubusername = req.body.githubusername;

  //skills - split into array 
  if (typeof req.body.skills !== 'undefined') {
    profileFields.skills = req.body.skills.split(',');
  }

  // social
  profileFields.social = {}
  if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
  if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
  if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
  if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
  if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

  const profile = await Profile.findOne({
    user: req.user.id
  })
  if (profile) {
    //update
    const profile = await Profile.findOneAndUpdate({
      user: req.user.id
    }, {
      $set: profileFields
    }, {
      new: true
    });
    res.json(profile);
  } else {
    //Create

    // check if handle exists
    const profile = await Profile.findOne({
      handle: profileFields.handle
    })
    if (profile) {
      res.status(400).json({
        handle: 'That handle already exists'
      })
    }
    // Save Profile
    const newProfile = await new Profile(profileFields).save()
    res.json(newProfile);
  }
});

module.exports = router;