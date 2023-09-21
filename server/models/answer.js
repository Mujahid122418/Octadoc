const mongoose = require("mongoose");
const schema = mongoose.Schema;
const FollowUpSchema = new mongoose.Schema({
  // answer: { type: String },
  question: {
    type: String,
    // required: true,
  },
  answer: {
    type: String,
    // required: true,
  },
  questionType: {
    type: String,
  },
  newId: { type: String, required: true },
  followBy: { type: String, required: true },
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
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    followUp: [FollowUpSchema],
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
