const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  username:{
    type:String,
    require:[true, "Please Add User Name"]
  },
  email:{
    type:String,
    require:[true, "Please Add The User Email Address"],
    unique:[true, "Email Address Already Email Taken"]

  },
  password:{
    type:String,
    require:[true, "Please Add User Password"]
  },
},
{
  timestamps:true,
}
)
module.exports = mongoose.model("User",userSchema)