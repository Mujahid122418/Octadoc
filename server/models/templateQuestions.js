const mongoose = require("mongoose");
const schema = mongoose.Schema;
// const question_Type_Schema = new mongoose.Schema({
//   text: String,
// });
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
    question_type: {
      type: String, // Defining the array schema
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
      type: mongoose.Schema.Types.ObjectId,
      ref: "template",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("templateQuestion", template_Schema);
