const express = require('express');
const cors = require('cors');
const {connectDatabase} = require('./config/database')
const user = require('./routes/user')


const app = express();

require("dotenv").config({path:"config/config.env"})

app.use(express.json({limit:"50mb"}));
app.use(cors());
app.use(user);
app.use(express.urlencoded({limit : "50mb",extended:true}));
const port = process.env.PORT || 5000;
connectDatabase();
app.listen(port,()=>{
    console.log(`Server is running on PORT ${port}`);
})