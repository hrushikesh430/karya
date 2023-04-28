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
const accountSid = process.env.accountSid;
const authToken = process.env.authToken;
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
  const jobData = await JobPost.find({ _id: req.body.postId });
  const phone = employeeData.phone;

  // client.messages
  //   .create({
  //     body: "You have got invitation for Job",
  //     from: "whatsapp:+14155238886",
  //     to: `whatsapp:+91${phone}`,
  //   })
  //   .then((message) => console.log(message));

  const client = require("twilio")(accountSid, authToken);

  client.messages
    .create({
      from: "whatsapp:+14155238886",
      to: `whatsapp:+91${phone}`,
      body: `You have got invitation for ${jobData[0].workName} from Employer - ${jobData[0].employeerName}`,
    })
    .then((message) => console.log(message.sid));

  res.json({
    status: "successfully invited to employee for post",
    employeeData,
  });
});
