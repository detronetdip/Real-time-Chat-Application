const Register = require("../models/register");
const Cnv = require("../models/conversesion");
const jwt = require("jsonwebtoken");
function register(app) {
  app.put("/api/respond", (req, res) => {
    const receivedData = req.body;
    console.log(receivedData);
    if (!("to" in receivedData) || !("accept" in receivedData)) {
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
        try {
          const from = jwt.verify(req.cookies.cookieName, process.env.KEY);
          const me = await Register.findOne({ _id: from.uid });
          const user = await Register.findOne({ _id: receivedData.to });
          const myindex = me.request.findIndex((e) => e.id == receivedData.to);
          const userindex = user.requested.findIndex((e) => e.id == from.uid);
          if (receivedData.accept == true) {
            if (myindex > -1 && userindex > -1) {
              me.friends.push(me.request[myindex]);
              user.friends.push(user.requested[userindex]);
              me.request.splice(myindex, 1);
              user.requested.splice(userindex, 1);
              await user.save();
              await me.save();
              const ds = await new Cnv({
                client_one: from.uid,
                client_two: receivedData.to,
              });
              await ds.save();
              res.json({
                status: 20,
                msg: "Accepted",
                type: "success",
              });
            } else {
              res.json({
                status: 50,
                msg: "Invalid",
                type: "warning",
              });
            }
          } else {
            if (myindex > -1 && userindex > -1) {
              me.request.splice(myindex, 1);
              user.requested.splice(userindex, 1);
              await user.save();
              await me.save();
              res.json({
                status: 20,
                msg: "Rejected",
                type: "success",
              });
            } else {
              res.json({
                status: 50,
                msg: "Invalid",
                type: "warning",
              });
            }
          }
        } catch (err) {
          res.status(500).json({ err });
        }
      };
      result();
    }
  });
}
module.exports = register;
