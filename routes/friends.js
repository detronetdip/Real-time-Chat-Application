const Register = require("../models/register");
const Cnv = require("../models/conversesion");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
function register(app) {
  app.get("/api/friends", async (req, res) => {
    const usg = await jwt.verify(req.cookies.cookieName, process.env.KEY);
    const data = await Register.findOne({
      _id: usg.uid,
    });
    var refined = data.friends.map((e) => {
      return mongoose.Types.ObjectId(e.id);
    });
    const result = await Register.find({ _id: { $in: refined } }).select({
      name: 1,
      _id: 0,
    });
    res.json(result);
  });
  app.get("/api/friendsList", async (req, res) => {
    const usg = await jwt.verify(req.cookies.cookieName, process.env.KEY);
    const data = await Register.findOne({
      _id: usg.uid,
    });
    var refined = data.friends.map((e) => {
      return mongoose.Types.ObjectId(e.id);
    });
    const result = await Register.find({ _id: { $in: refined } }).select({
      name: 1,
    });
    res.json(result);
  });
  app.get("/api/friends/req", async (req, res) => {
    const usg = await jwt.verify(req.cookies.cookieName, process.env.KEY);
    const data = await Register.findOne({
      _id: usg.uid,
    });
    var refined = data.request.map((e) => {
      return mongoose.Types.ObjectId(e.id);
    });
    const result = await Register.find({ _id: { $in: refined } }).select({
      name: 1,
    });
    res.json(result);
  });
  app.post("/api/get", async (req, res) => {
    const receivedData = req.body;
    const usg = await jwt.verify(req.cookies.cookieName, process.env.KEY);
    const d = await Cnv.find({
      $or: [
        {
          client_one: usg.uid,
        },
        {
          client_two: usg.id,
        },
      ],
    });
    d.forEach(e=>{
      console.log(e)
    })
  });

}
module.exports = register;
