const mongoose = require("mongoose");
const schema = mongoose.Schema;

const category_Schema = new schema(
  {
    category: {
      type: String,
    },
    enable:{
      type: Boolean,
     
      default: true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("category", category_Schema);
