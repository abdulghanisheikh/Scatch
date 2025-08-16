const express=require('express');
const router=express.Router();
const ownerModel=require('../models/owner-model');
const dotenv=require('dotenv');
dotenv.config();

router.get("/",(req,res)=>{
    res.send("<h1>Hello from owner</h1>");
});

if(process.env.NODE_ENV==="development"){
    router.post("/create",async(req,res)=>{
        let owners=await ownerModel.find();
        if(owners.length>0){
            return res.status(503).send("You don't have permission to create a new owner");
        }
        const {fullName,email,password,gstNo}=req.body;
        let createdOwner=await ownerModel.create({
            fullName,
            email,
            password
        });
        res.status(200).send(createdOwner);
    });
}

module.exports=router;