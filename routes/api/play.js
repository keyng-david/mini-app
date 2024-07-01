const express = require("express");
const router = express.Router();
const { validationResult } = require("express-validator");

const User = require("../../models/User");

// @route    POST api/play
// @desc     Play Game
router.post("/", async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { tgid, selected } = req.body;

    // Get user info
    const user = await User.findOne({ tgid: req.body.tgid });

    // Generate random
    const random = Math.floor(Math.random(0, 1) * 3 + 1);
    console.log(random, selected);
    if (random != selected) {
      res.status(201).json("Doesn't match!");
      return;
    }

    const totalScore = user.totalScore + 1;
    const score = user.score + 1;

    // Using upsert option (creates new doc if no match is found):
    await User.findOneAndUpdate({ tgid: req.body.tgid }, { totalScore, score });

    res.status(201).json("Success!");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
