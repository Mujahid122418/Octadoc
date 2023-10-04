const express = require("express");

const {
  addQuestion,
  getQuestion,
  // deleteQuestion,
  updateQuestion,
  singleQuestion,
  EditQuestions,
  DeleteQuestions,
  countQuestion,
} = require("../controller/templateQuestion");

const router = express.Router();

// const { protect } = require('../middleware/auth');

router.post("/question", addQuestion);
router.put("/question/:id", EditQuestions);
router.post("/questionDelete", DeleteQuestions);
router.get("/question", getQuestion);
// router.delete("/question/:id", deleteQuestion);
router.put("/question/:id", updateQuestion);
router.get("/singleQueston/:id", singleQuestion);
router.get("/countQuestion/:id", countQuestion);
module.exports = router;
