const mongoose = require("mongoose")

const connectDB= ()=>{
    mongoose.connect(process.env.MONGO_URI,{dbName:"MyContacts"}).then(()=>{
        console.log("DataBase Connected Successfully");
    }).catch(()=>{
        console.log("DataBase connection Failed");
    })
}

module.exports=connectDB