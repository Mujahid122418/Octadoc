const express = require("express");
const {
  addSection,
  getSection,
  deleteSection,
  updateSection,
  updateManySection,
  // getSectionTemplate,
  countSection,
} = require("../controller/section");

const router = express.Router();

// const { protect } = require('../middleware/auth');

router.post("/section", addSection);
router.get("/countSection/:id", countSection);

router.post("/sectionUpdateMany", updateManySection);

router.get("/section", getSection);
router.delete("/section/:id", deleteSection);
router.put("/section/:id", updateSection);
// router.get("/section/:id", getSectionTemplate);

module.exports = router;
// answer: [{ ans: newAnswer }, { ansOutput: newAnswerOutput }],