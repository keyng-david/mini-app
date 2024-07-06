const express = require("express");
const router = express.Router();
const { validationResult } = require("express-validator");
// bring in normalize to give us a proper url, regardless of what user entered

const User = require("../../models/User");
const auth = require("../../middleware/auth");

// @route    POST api/users/wallet
// @desc     Create or Update user user
// @access   Public
router.post("/wallet", async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Using upsert option (creates new doc if no match is found):
    const { tgid, walletAddress } = req.body;
    const user = await User.findOneAndUpdate(
      { tgid },
      { tgid, walletAddress },
      { new: true, upsert: true }
    );

    res.status(201).json(user);
    // next();
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err);
  }
});

// @route    POST api/users
// @desc     Create or Update user user
// @access   Public
router.post("/", async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Using upsert option (creates new doc if no match is found):
    const { tgid, username, firstName, lastName } = req.body;
    const user = await User.findOneAndUpdate(
      { tgid },
      { tgid, username, firstName, lastName },
      { new: true, upsert: true }
    );

    res.status(201).json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/users/user/:user_id
// @desc     Get user by user ID
// @access   Public
router.get("/user/:user_id", async (req, res) => {
  try {
    const user = await User.findOne({
      tgid: req.params.user_id,
    });

    if (!user) return res.status(400).json({ msg: "User not found" });

    res.json(user);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "User not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route    GET api/users
// @desc     Get all users
// @access   Private
router.get("/", async (req, res) => {
  try {
    const users = await User.find();

    if (!users) throw { message: "Users not found", kind: "ObjectId" };

    res.json(users);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "Users not found" });
    }
    res.status(500).send("Server Error");
  }
});

module.exports = router;
