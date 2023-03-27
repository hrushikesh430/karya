require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const app = express();
const AppError = require("../utils/AppError");
const tryCatch = require("../utils/tryCatch");
const Employee = require('../models/Employee');
const Employeer = require('../models/Employeer');
const bodyParser = require('body-parser')
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const autheticationToken =  async(req,res,next)=>{
  
    const token = req.cookies.access_token;
//    console.log(token);

   try {
        if(token == null) throw new AppError(300,"have no access",401);

    try {
        const data = jwt.verify(token,process.env.ACCESS_TOKEN);
        req.email = data.email;
        
        req.password = data.password; 
        req.employee = await Employee.find({email:data.email,password:data.password});
        req.employeer = await Employeer.find({email:data.email,password:data.password});
        if(req.employee[0] && req.employeer[0])
        {
            return res.json({
                status:"failed",
                reason:"user not created"
            })
        }
        return next();
    } catch (error) {
        throw new AppError(300,"token expire",403);
    }
   } catch (error) {
        return res.json({
            status:"authentication problem",
            reason:"user not created"
        })
   }
    

    

}
module.exports = autheticationToken;