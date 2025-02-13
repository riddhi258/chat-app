const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const  {connectDB }= require ('./lib/db')
const cookieParser = require ('cookie-parser')
require('dotenv').config();
const authRoutes = require('./routes/auth.route');
const messageRoutes = require('./routes/message.route');
const {app,server} = require('./lib/Socket');
const path  = require('path');

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

const PORT= process.env.PORT;
// const __dirname= path.resolve();

app.use(cookieParser());
app.use(express.json({ limit: '10mb' }));

app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoutes)  

if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")));

    app.get('*',(req,res)=>{
        res.sendFile(path.join(__dirname,"../frontend/dist/index.html"));})
}

server.listen(PORT, ()=>{
    console.log("server is running port :"+PORT);
    connectDB();
});;