const mongoose = require("mongoose");
mongoose.connect(process.env.DB, () => {
  console.log("Db connected...");
});
module.exports=mongoose;
