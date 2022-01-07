const mongoose = require("mongoose");
const Message = new mongoose.Schema(
  {
    cid: {
      type: String,
      required: true,
    },
    sender: {
      type: String,
      required: true,
    },
    receiver: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    sn: String,
    rn: String,
  },
  { timestamps: true }
);
module.exports = new mongoose.model("messages", Message);
