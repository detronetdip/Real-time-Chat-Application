const Register = require("../models/register");
const jwt = require("jsonwebtoken");
function view(app) {
  app.post("/api/view", (req, res) => {
    const reg = async () => {
      const v = await jwt.verify(req.cookies.cookieName, process.env.KEY);
      const crs = await Register.findOne({
        _id: req.body.uid,
      });
      const urs = await Register.findOne({
        _id: v.uid,
      });
      console.log(urs._id == req.body.uid);
      if (crs) {
        await res.json({
          name: crs.name,
          friends: crs.friends.length,
          valid: true,
          op: urs._id == req.body.uid,
          if: urs.friends.findIndex((e) => e.id == req.body.uid),
          rq: urs.request.findIndex((e) => e.id == req.body.uid),
          rqd: urs.requested.findIndex((e) => e.id == req.body.uid),
        });
      } else {
        await res.json({
          valid: null,
        });
      }
    };
    reg();
  });
}
module.exports = view;
