const mongoose = require("mongoose");
const schema = mongoose.Schema;

const template_Schema = new schema(
  {
    template_name: {
      type: String,
    },
    description: {
      type: String,
    },
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
    },
    template_type: {
      type: String,
      enum: ["public", "private"],
    },
    isapprove: {
      type: String,
    },
    user_id: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("template", template_Schema);
