const mongoose = require("mongoose")

const employee = new mongoose.Schema({
    name:{
        type:String,
        required :[true,"Please provide your name"]  
    },
    email:{
        type:String,
        required :[true,"Please provide your email"]  
    },
    password:{
        type:String,
        required :[true,"Please provide your password"]  
    },
    phone:{
        type:Number,
        required:[true,"Please provide your email"]
    },
    occuopation:{
        type:String,
        default:"Employee"
    },
    address:{
        type:String,
        default:null

    },
    aboutMe:{
        type:String,
        default:null
        
    },
    loginTime:{
        type:Boolean,
        default:false,
    },
    insta:{
        type:String
    },
    facebook:{
        type:String
    },
    skills:[
        {
            type:String,
            default:null
        }
    ],
    location:{
        type:{
            type:String
        },
        coordinates:{
            type:Array
        }
    }
   

});
const Employee = mongoose.model("employee",employee); 
module.exports = Employee