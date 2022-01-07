const Register = require("../models/register");
const jwt = require("jsonwebtoken");
function validate(app) {
  app.post("/api/search", (req, res) => {
    var match = new RegExp(`${req.body.si}`, "i");
    const reg = async () => {
      const crs = await Register.find({ name: { $regex: match } }).select({
        name: 1,
        _id: 1,
      });
      res.json(crs);
    };
    reg();
  });
}
module.exports = validate;
