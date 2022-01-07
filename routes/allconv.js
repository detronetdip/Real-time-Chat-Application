const Register = require("../models/register");
const mongoose =require('mongoose')
function allconv(app) {
  app.get("/api/allconv", (req, res) => {
    const receivedData = req.body;
    if (!("id" in receivedData)) {
      res.json({
        status: 80,
        msg: "Broken Data Received",
        type: "warning",
      });
    } else if (receivedData.id == "" ) {
      res.json({
        status: 50,
        msg: "All fields are mandatory",
        type: "warning",
      });
    } else {
      const result = async () => {
          try{
            const user=await Register.findOne({'_id':receivedData.id});
            const refined=user.friends.map(e=>{
                return mongoose.Types.ObjectId(e.id);
            })
            const result=await Register.find({'_id':{$in:refined}}).select({"name":1})
            res.json({result});
          }catch(err){
              res.status(500).json({err})
          }
      };
      result();
    }
  });
}
module.exports = allconv;
