const express = require("express");
const {
  addInterest,
  getInterest,
  deleteInterest,
  updateInterest,

  // getInterestTemplate
} = require("../controller/interest");

const router = express.Router();

// const { protect } = require('../middleware/auth');

router.post("/Interest", addInterest);

router.get("/Interest", getInterest);
router.delete("/Interest/:id", deleteInterest);
router.put("/Interest/:id", updateInterest);
// router.get("/Interest/:id", getInterestTemplate);

module.exports = router;
