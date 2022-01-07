const Register = require("../models/register");
const Cnv = require("../models/conversesion");
const jwt = require("jsonwebtoken");
function register(app) {
  app.put("/api/friendRequest", (req, res) => {
    const receivedData = req.body;
    if (!("to" in receivedData)) {
      res.json({
        status: 80,
        msg: "Broken Data Received",
        type: "warning",
      });
    } else if (receivedData.to == "") {
      res.json({
        status: 50,
        msg: "All fields are mandatory",
        type: "warning",
      });
    } else {
      const result = async () => {
        const usg = await jwt.verify(req.cookies.cookieName, process.env.KEY);
        const user = await Register.findOne({ _id: receivedData.to });
        const me = await Register.findOne({ _id: usg.uid });
        if (usg.uid == receivedData.to) {
          res.json({
            status: 51,
            msg: "Can't add yourself as friend",
            type: "warning",
          });
        } else if (user.friends.find((e) => e.id == receivedData.from)) {
          res.json({
            status: 51,
            msg: "Alredy friend",
            type: "warning",
          });
        } else if (user.request.find((e) => e.id == receivedData.from)) {
          res.json({
            status: 51,
            msg: "Alredy requested",
            type: "warning",
          });
        } else {
          user.request.push({
            id: usg.uid,
          });
          me.requested.push({
            id: receivedData.to,
          });
          await me.save();
          await user.save();
          res.json({
            status: 60,
            msg: "Request sent",
            type: "success",
          });
        }
      };
      result();
    }
  });
  app.put("/api/unfriend", (req, res) => {
    const receivedData = req.body;
    if (!("to" in receivedData)) {
      res.json({
        status: 80,
        msg: "Broken Data Received",
        type: "warning",
      });
    } else if (receivedData.to == "") {
      res.json({
        status: 50,
        msg: "All fields are mandatory",
        type: "warning",
      });
    } else {
      const result = async () => {
        const usg = await jwt.verify(req.cookies.cookieName, process.env.KEY);
        var user = await Register.findOne({ _id: receivedData.to });
        var me = await Register.findOne({ _id: usg.uid });
        var userIndex = user.friends.findIndex((e) => e.id == usg.uid);
        var myIndex = me.friends.findIndex((e) => e.id == receivedData.to);
        user.friends.splice(userIndex, 1);
        me.friends.splice(myIndex, 1);
        const d = await Cnv.find({
          $or: [
            {
              client_one: receivedData.to,
              client_two: usg.uid,
            },
            {
              client_one: usg.uid,
              client_two: receivedData.to,
            },
          ],
        });
        await Cnv.deleteOne({_id:d[0]._id});
        await user.save();
        await me.save();
        res.send();
      };
      result();
    }
  });
}
module.exports = register;
