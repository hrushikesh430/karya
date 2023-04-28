require("dotenv").config();
const express = require("express");
const app = express();
const PORT = 3000 | process.env.PORT;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const tryCatch = require("../../utils/tryCatch");
const AppError = require("../../utils/AppError");
const jwt = require("jsonwebtoken");
const Employee = require("../../models/Employee");
const Employeer = require("../../models/Employeer");
const JobPost = require("../../models/jobPost");
const JobPostPerEmployeer = require("../../models/jobPostPerEmployeer");
const accountSid = "AC92293dcda3bc076860b99e1b1ef7e7d0";
const authToken = "f69231ed5b8760cc783589e8958ecd9b";
const client = require("twilio")(accountSid, authToken);
// Body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

exports.postJobInvitaion = tryCatch(async (req, res, next) => {
  const employeeData = await Employee.findOneAndUpdate(
    { _id: req.body.employeeId },
    { $push: { jobInvitation: req.body.postId } },
    { new: true }
  );
  const phone = employeeData[0].phone;

  client.messages
    .create({
      body: "You have got invitation for Job",
      from: "whatsapp:+14155238886",
      to: `whatsapp:+91${phone}`,
    })
    .then((message) => console.log(message));
  res.json({
    status: "success",
  });

  res.json({
    status: "successfully invited to employee for post",
    employeeData,
  });
});
