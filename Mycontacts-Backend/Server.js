const dotenv = require('dotenv').config()
const express = require("express");
const app = express();
const contactRoutes = require("./routes/contactsRoutes");
const errorHandler = require('./middlewares/errorHandler');
const connectDB = require("./config/db")
connectDB();
const userRoutes = require("./routes/userRoutes")
app.use(express.json())
const port = process.env.PORT
app.use('/api/contacts',contactRoutes)

app.use('/api/users',userRoutes)


app.use(errorHandler)

app.listen(port,()=>{
    console.log(`The server is runnig on ${port} port`);
});
