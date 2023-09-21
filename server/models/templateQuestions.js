const mongoose = require("mongoose");
const schema = mongoose.Schema;

const FollowUpSchema = new mongoose.Schema({
  question: {
    type: String,
  },
  answer: [
    {
      type: String,
    },
  ],
  questionType: {
    type: String,
  },
  parentId: {
    type: String,
  },
  template_id: {
    // type: String,
    type: mongoose.Schema.Types.ObjectId,
    ref: "template",
  },
  section_id: {
    type: String,
  },
  newId: { type: String, required: true },
  followBy: { type: String, required: true },
});

const template_Schema = new schema(
  {
    name: {
      type: String,
    },
    type: {
      type: String,
    },
    tip: {
      type: String,
    },
    helptext: {
      type: String,
    },
    questionType: {
      type: String,
    },
    order: {
      type: String,
    },
    is_followup_question: {
      type: String,
    },
    followup_question: {
      type: String,
    },
    template_id: {
      // type: String,
      type: mongoose.Schema.Types.ObjectId,
      ref: "template",
    },
    section_id: {
      type: String,
    },
    question: {
      type: String,
      required: true,
    },
    answer: [
      {
        type: String,
      },
    ],
    followUp: [FollowUpSchema],
    parentId: {
      type: String,
    },
    // answers: {
    //   type: String,
    // },
    index: {
      type: String,
    },
    // Question: {
    //   type: [Questions_Schema],
    // },
    // followUp: [
    //   { type: mongoose.Schema.Types.ObjectId, ref: "templatequestion" },
    // ], // Use ObjectId reference
  },
  { timestamps: true }
);

module.exports = mongoose.model("templatequestion", template_Schema);
