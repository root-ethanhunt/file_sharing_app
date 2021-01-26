const express = require('express')
const mongoose = require('../config/mongoose')
const File = require('../models/file')
const router = express.Router()

router.get('/:uuid',async(req,res)=>{
    try{
        const file = await File.findOne({uuid:req.params.uuid})
        if(!file){
            return res.render('download',{
                error:'Something went wrong!'
            }) 
        }

        return res.render('download',{
            uuid:file.uuid,
            fileName:file.fileName,
            fileSize:file.size,
            download:`${process.env.APP_URL}/files/download/${file.uuid}`
             
        })
    }
    catch(err){
        return res.render('download',{
            error:'Something went wrong!'
        })
    }
})

module.exports = router