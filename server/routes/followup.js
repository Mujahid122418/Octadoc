const express = require("express");
const {
  addFollowUp,
  getFollowUp,
  deleteFollowUp,
  updateFollowUp,
} = require("../controller/followup");

const router = express.Router();

// const { protect } = require('../middleware/auth');

router.post("/followup", addFollowUp);
router.get("/followup", getFollowUp);
router.delete("/followup/:id", deleteFollowUp);
router.put("/followup/:id", updateFollowUp);

module.exports = router;
