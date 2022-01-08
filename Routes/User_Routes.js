const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const USER = require("../Schema/AuthSchema");
const res = require("express/lib/response");

router.get("/with_requests", async (req, res) => {
  const user = await USER.find()
    .populate({ path: "get_request" })
    .populate({ path: "send_request" });
  res.status(200).send({ success: true, user });
});
router.get("/all", async (req, res) => {
  try {
    const user = await USER.find();
    res.status(200).send({ success: true, user });
  } catch (e) {
    console.log(e);
  }
});
router.get("/gender", async (req, res) => {
  try {
    const { gender } = req.body;
    const users = await USER.find({ gender });
    res.status(200).send({ success: true, msg: `All ${gender} USERS`, users });
  } catch (e) {
    console.log(e);
  }
});

router.get("/one/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;
    const user = await USER.findById(user_id)
      .populate({ path: "get_request" })
      .populate({ path: "send_request" });

    res
      .status(200)
      .send({ success: true, msg: "Successfully fetched details", user });
  } catch (e) {
    console.log(e);
  }
});
module.exports = router;
