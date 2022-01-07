const mongoose = require("mongoose");
const cnvSchema = new mongoose.Schema({
  client_one: {
    type: String,
    required: true,
  },
  client_two: {
    type: String,
    required: true,
  },
});
module.exports = new mongoose.model("conversesion", cnvSchema);
