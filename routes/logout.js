const jwt = require("jsonwebtoken");
function Logout(app) {
  app.post("/logout", async (req, res) => {
    res.clearCookie("cookieName");
    res.json({done:true})
  });
}
module.exports = Logout;
