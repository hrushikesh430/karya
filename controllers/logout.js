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

if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}
// Body-parser middleware
app.use(cookieParser());

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())


exports.getLogout = tryCatch(async(req,res,next)=>{
    
    res.clearCookie('access_token').json({
        status:"Sccessfully logout"
    });
    
})

