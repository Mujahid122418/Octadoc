const mongoose = require("mongoose");
const schema = mongoose.Schema;

const followUp_Schema = new schema(
  {
    answer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "answer",
    },
    question_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "templatequestion",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("followUp", followUp_Schema);
