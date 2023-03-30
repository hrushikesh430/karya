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
    
    profileImg:{
        type:String
    }
    ,
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
        default:"Employeer"
    },
    address:{
        type:String,
        default:null
    },
    aboutMe:{
        type:String,
        default:null
    },
    insta:{
        type:String
    },
    facebook:{
        type:String
    }
    ,
    loginTime:{
        type:Boolean,
        default:false,
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
const Employee = mongoose.model("employeer",employee); 
module.exports = Employee