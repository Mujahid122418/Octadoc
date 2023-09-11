const express = require("express");
const {
  addAnswer,
  getAnswer,
  deleteAnswer,
  updateAnswer,
  addAnswer_Against_Question,
} = require("../controller/answer");

const router = express.Router();

// const { protect } = require('../middleware/auth');

router.post("/answer", addAnswer);
router.get("/answer", getAnswer);
router.delete("/answer/:id", deleteAnswer);
router.put("/answer/:id", updateAnswer);
router.post("/Qanswer", addAnswer_Against_Question);
module.exports = router;
