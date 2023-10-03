const mongoose = require("mongoose");
const schema = mongoose.Schema;

const interest_Schema = new schema(
  {
    user_id: {
      type: String,
      trim: true,
    },
    name: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("interest", interest_Schema);
