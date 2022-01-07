const mongoose = require("mongoose");
const registerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  friends: {
    type: Array,
  },
  request: {
    type: Array,
  },
  requested: {
    type: Array,
  },
});
module.exports = new mongoose.model("user", registerSchema);
