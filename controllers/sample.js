require('dotenv').config();
const express = require('express');
const app = express();
const PORT = 3000 | process.env.PORT;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser")
const tryCatch = require("../utils/tryCatch");
const AppError = require("../utils/AppError");
const jwt = require("jsonwebtoken")
const Employee = require('../models/Employee');
const Employeer = require('../models/Employeer');

// Body-parser middleware
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())


exports.getSample = tryCatch(async(req,res,next)=>{
    // console.log(req.employee);
    // console.log(req.employeer[0]+" here it is");
    if(req.employeer[0] == undefined)
    {
        console.log("this is true");
    }
   
    res.json({
        status:"success"
    })
})