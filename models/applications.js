const mongoose = require("mongoose")

const application = new mongoose.Schema({
    postId:{
       type: String
    },
    employeeId:{
        type:String
    },
    employeerId:{
        type:String
    }
   

});
const Application = mongoose.model("application",application); 
module.exports = Application