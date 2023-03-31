const mongoose = require("mongoose")

const history = new mongoose.Schema({
    workName:{
        type:String,
       
    },
    employeerName:{
        type:String
    }
    ,
    workAddress:{
        type:String,
       
    },
    workDuration:{
        type:String,
    
    },
    workTime:{
        type:String,

    },
    workDescription:{
        type:String,
    }
    ,
    applicationId:[
     {   type:String
     }
    ]
    ,
    assignedId:[
        {
            type:String
        }
    ]
    ,
    workFrom:{
        type:String,
   
    },
    location:{
        type:{
            type:String
        },
        coordinates:{
            type:Array
        }
    },
    postTime:{
        type:String
    },
    employeerId:{
        type:String
    }
   

});
const History = mongoose.model("history",history); 
module.exports = History