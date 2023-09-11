const mongoose = require("mongoose");
const schema = mongoose.Schema;
const ans_Schema = new mongoose.Schema({
  answer: { type: String },
});
const answer_Schema = new schema(
  {
    follow_up_question_group_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "templatequestion",
    },
    text: {
      type: String,
    },
    answer: {
      type: [ans_Schema],
    },
    question: {
      type: String,
    },
    question_type: {
      type: String,
    },
    output: {
      type: String,
    },
    order: {
      type: String,
    },
    question_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "templatequestion",
    },
    template_id: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("answer", answer_Schema);
