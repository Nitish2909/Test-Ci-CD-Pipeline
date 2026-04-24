const mongoose = require("mongoose")

const contactSchema = new mongoose.Schema({

    name:{
        type:String,
        required:[true,"Please add the Contact name"]
    },
    email:{
         type:String,
        required:[true,"Please add the Contact email address"]
    },
    phone:{
        type:String,
        required:[true,"Please add the Contact Phone Number"]
    }
})


module.exports= mongoose.model("Contact",contactSchema)