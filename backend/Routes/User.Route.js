const express = require("express");
require("dotenv").config();
const { userAuthentication } = require("../Middlewares/User.auth.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { UserModel } = require("../Models/User.model.js");

const UserRouter = express.Router();

UserRouter.post("/register", async (req, res) => {
  const { nickname, password } = req.body;

  const user = await UserModel.find({ nickname });
  if (user.length === 0) {
    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
        res.status(400).send({ message: "Something Went Wrong" });
      } else {
        try {
          const newUser = new UserModel({
            nickname,
            password: hash,
          });
          await newUser.save();
          res.status(200).send({ message: "User Registration Suceessful" });
        } catch (e) {
          res.status(401).send({ message: "Something Went Wrong" });
        }
      }
    });
  } else {
    res.status(201).send({ message: "User already exist, Please login" });
  }
});

UserRouter.post("/login", async (req, res) => {
  const { nickname, password } = req.body;

  const user = await UserModel.find({ nickname });

  if (user.length > 0) {
    bcrypt.compare(password, user[0].password, async (err, result) => {
      if (result) {
        try {
          const token = jwt.sign(
            { userID: user[0]._id },
            process.env.userSecretKey
          );
          res.status(200).send({ message: "Login Successful", token: token });
        } catch (e) {
          res
            .status(401)
            .send({ message: "Something Went Wrong", err: e.message });
        }
      } else {
        res
          .status(201)
          .send({ message: "Wrong Credentials", error: "Wrong Password" });
      }
    });
  } else {
    res
      .status(201)
      .send({ message: "User is not registered,Please register first" });
  }
});

UserRouter.get("/user", userAuthentication, async (req, res) => {
  const { userID } = req.body;
  // console.log(userID);
  try {
    const user = await UserModel.findOne({ _id: userID });
    res.status(200).send({ message: "User Details", user: user });
  } catch (e) {
    res.status(201).send({
      message: "User is not authenticated,Please login first",
      error: e,
    });
  }
});

// To get all the users details
UserRouter.post("/setuser", async (req, res) => {
  let user = new UserModel(req.body);
  await user.save();
  res.status(200).send({ message: "User Added",displayMessage: "Successful" });
});

UserRouter.post("/sleepStuggle", async (req, res) => {
  let { username, userResponse } = req.body;
  await UserModel.findOneAndUpdate(
    { username },
    { sleepStuggle: userResponse }
  );
  res
    .status(200)
    .send({
      message: "Sleep Struggle response added",
      displayMessage: "Successful",
    });
});
UserRouter.post("/goTobed", async (req, res) => {
  let { username, userResponse } = req.body;

  await UserModel.findOneAndUpdate({ username }, { goTobed: userResponse });
  res
    .status(200)
    .send({
      message: "Go to bed response added",
      displayMessage: "Successful",
    });
});
UserRouter.post("/getOutofBed", async (req, res) => {
  let { username, userResponse } = req.body;

  await UserModel.findOneAndUpdate({ username }, { getOutofBed: userResponse });
  res
    .status(200)
    .send({
      message: "Get out of Bed response added",
      displayMessage: "Successful",
    });
});

UserRouter.post("/sleepHours", async (req, res) => {
  let { username, userResponse } = req.body;
  await UserModel.findOneAndUpdate({ username }, { sleepHours: userResponse });
  res
    .status(200)
    .send({
      message: "Sleep Hours response added",
      displayMessage: "Successful",
    });
});

UserRouter.get("/sleepEfficiency", async (req, res) => {
  let { username } = req.body;

  let user = await UserModel.findOne({ username });
  // console.log(user);
  let sleepHours = +user.sleepHours;
  let getOutofBed = user.getOutofBed; //[11:00 Am]
  let goTobed = user.goTobed; //[11:40 Am]

  function getTime(Time) {
    const [time, modifier] = Time.split(" ");
    let [hours, minutes] = Time.split(":");

    if (modifier == "Pm" && hours < 12) {
      hours = parseInt(hours) + 12;
    }
    if (modifier == "Am" && hours == 12) {
      hours = parseInt(hours) - 12;
    }
    return hours;
  }

  let sleepingTime = getTime(goTobed);
  let wakingTime = getTime(getOutofBed);

  if (wakingTime < sleepingTime) {
    wakingTime = +wakingTime + 24;
  }
  // console.log(sleepingTime);
  // console.log(wakingTime);
  // console.log(sleepHours);

  let sleepEfficiency = Math.ceil(
    (Number(sleepHours) * 100) / (Number(wakingTime) - Number(sleepingTime))
  );

  // console.log(`${sleepEfficiency}%`);
  res
    .status(200)
    .send({ sleepEfficiency: sleepEfficiency, displayMessage: "Successful" });
});


module.exports = { UserRouter };
