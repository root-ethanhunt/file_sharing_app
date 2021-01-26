require('dotenv').config();
const express = require('express')
const mongoose = require('./config/mongoose')
const path = require('path')
const app = express()


const PORT = process.env.PORT||8000

app.use(express.json());

//Template engine
app.set('views',path.join(__dirname,'/views'))
app.set('view engine','ejs')


// Routers
app.use('/api/files',require('./routes/files'))
app.use('/files',require('./routes/show'))
app.use('/files/download',require('./routes/download'))

app.listen(PORT,()=>{
 console.log(`Listening on port ${PORT}`)
})