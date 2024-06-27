const express = require('express');
const request = require('request');
const config = require('config');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
// bring in normalize to give us a proper url, regardless of what user entered
const normalize = require('normalize-url');

const User = require('../../models/User');


// @route    GET api/users/me
// @desc     Get current users user
// @access   Private
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findOne({
      user: req.user.id
    });//.populate('user', ['firstName', 'lastName','email']);

    if (!user) {
      return res.status(400).json({ msg: 'There is no user for this user' });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/user
// @desc     Create or update user user
// @access   Private
router.post('/', auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const profileFields = {
    user: req.user.id,
  };

  try {
    // Using upsert option (creates new doc if no match is found):
    let user = await User.findOneAndUpdate(
      { user: req.user.id },
      { $set: profileFields },
      { new: true, upsert: true }
    );

    res.status(201).json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}
);

// @route    GET api/users/user/:user_id
// @desc     Get user by user ID
// @access   Public
router.get('/user/:user_id', async (req, res) => {
  try {
    const user = await User.findOne({
      user: req.params.user_id
    });//.populate('user', ['name']);

    if (!user) return res.status(400).json({ msg: 'User not found' });

    res.json(user);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'User not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
