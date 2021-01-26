const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const File = require('../models/file')
const { v4: uuidv4 } = require('uuid');




let storage = multer.diskStorage({
    destination:  (req, file, cb) => {
      cb(null, 'uploads/')
    },
    filename: (req, file, cb)=> {
        const uniqueName= `${Date.now()}-${Math.round(Math.random()*1E9)}${path.extname(file.originalname)}`
      //cb(null, file.fieldname + '-' + Date.now())
      cb(null,uniqueName)
    }
  })
   
  let upload = multer({ 
      storage: storage,
      limits:{fileSize:1000000 * 100},
}).single('myfile')




router.post('/',(req,res)=>{
 
  //Store file

  upload(req,res,async (err)=>{

     //Validate request
  if(!req.file){
    return res.json({
        error:'All fields are required '
    })
 } 


      if(err) {
          return res.status(500).send({error:err.message})
      }
     
      //Store into Database
     const file = new File({
       filename:req.file.filename,
       uuid:uuidv4(),
       path:req.file.path,
       size:req.file.size
    }) 

    const response = await file.save()
    return res.json({file:`${process.env.APP_URL}/files/${response.uuid}`})
    //http://localhost:8000/files/saersgjfhj-xgchfxghc


})

 
  //Response -> Link
})

router.post('/send',async(req,res)=>{
  const{uuid,emailTo,emailFrom}= req.body

  if(!uuid||!emailFrom||!emailTo){
    return res.status(422).send({error:'All fields are required.'})
  }

  const file = await File.findOne({uuid:uuid})

  if(file.sender){
    return res.status(422).send({error:'Email already sent.'})

  }

  file.sender = emailFrom
  file.receiver = emailTo
  const response = await file.save()

  //send email
  const sendMail = require('../services/emailService')

  sendMail({
    from:emailTo,
    to:emailTo,
    subject:'shareApp',
    text:`${emailFrom} shared a file with you`,
    html:'<section> download-->${}</section>'
  })
  return res.send({success:'Email already sent'})

})

module.exports = router
