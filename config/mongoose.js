const dotenv = require('dotenv').config()
const mongoose = require('mongoose')



//const MONGODB_URL="mongodb://localhost:27017/FileSharing"

const db = mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false,
    useUnifiedTopology: true
}).then(()=>{
    console.log('database connected...')
}).catch((e)=>{
    console.log('Error',e)
})

module.exports= db