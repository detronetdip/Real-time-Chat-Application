const Register = require("../models/register");
function register(app) {
  app.post("/api/register", (req, res) => {
    const receivedData = req.body;
    if (
      !("name" in receivedData) ||
      !("email" in receivedData) ||
      !("password" in receivedData)
    ) {
      res.json({
        status: 80,
        msg: "Broken Data Received",
        type: "warning",
      });
    } else if (
      receivedData.name == "" ||
      receivedData.email == "" ||
      receivedData.password == ""
    ) {
      res.json({
        status: 50,
        msg: "All fields are mandatory",
        type: "warning",
      });
    } else {
      const reg = async () => {
        const result = await new Register({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
        });
        await result.save();
         res.json({
          status: 1,
          msg: "successfull",
          type: "success",
        });
      };
      reg();
    }
  });
}
module.exports = register;
