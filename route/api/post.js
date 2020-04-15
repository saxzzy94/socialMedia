const express = require('express');
const router = express.Router();

//@route GET api/post/test
//@desc test post route
//@access  public
router.get('/test', (req, res) => res.json({
  msg: "Post works"
}));

module.exports = router;