const Message = require("../models/message");
const Cnv = require("../models/conversesion");
const Register = require("../models/register");
function message(app) {
  app.post("/api/message", (req, res) => {
    const reg = async () => {
      const data = req.body;
      const d = await Cnv.find({
        $or: [
          {
            client_one: data.sender,
            client_two: data.receiver,
          },
          {
            client_one: data.receiver,
            client_two: data.sender,
          },
        ],
      });
      const cnvId = d[0]._id;
      const senderName=await Register.findOne({_id:data.sender});
      const receiverName=await Register.findOne({_id:data.receiver});
      const result = await new Message({
        cid: cnvId,
        sender: data.sender,
        receiver: data.receiver,
        text: data.text,
        sn:senderName.name,
        rn:receiverName.name
      });
      await result.save();
      res.send()
    };
    reg();
  });
  app.post("/api/get/message", (req, res) => {
    const reg = async () => {
      const data = req.body;
      const d = await Cnv.find({
        $or: [
          {
            client_one: data.sender,
            client_two: data.receiver,
          },
          {
            client_one: data.receiver,
            client_two: data.sender,
          },
        ],
      });
      const cnvId = d[0]._id;
      const result=await Message.find({cid:cnvId}).select({sender:1,createdAt:1,text:1,sn:1})
      res.send(result);
    };
    reg();
  });
}
module.exports = message;
