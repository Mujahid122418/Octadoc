const mongoose = require("mongoose");
const schema = mongoose.Schema;

const answer_Schema = new schema(
  {
    follow_up_question_group_id: {
      type: String,
    },
    text: {
      type: String,
    },
    output: {
      type: String,
    },
    order: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("answer", answer_Schema);
