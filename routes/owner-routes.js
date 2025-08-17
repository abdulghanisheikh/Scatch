const express=require('express');
const router=express.Router();
const ownerModel=require('../models/owner-model');
const bcrypt=require('bcrypt');
const dotenv=require('dotenv');
const isLoggedIn=require('../middlewares/isLoggedIn.js');
dotenv.config();

if(process.env.NODE_ENV==="development"){
    router.post("/create",async(req,res)=>{
        let owners=await ownerModel.find();
        if(owners.length>0){
            return res.status(503).send("You don't have permission to create a new owner");
        }
        const {fullName,email,password,gstNo}=req.body;
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);
        let createdOwner=await ownerModel.create({
            fullName,
            email,
            password:hashedPassword
        });
        res.status(200).send(createdOwner);
    });
}

router.get("/admin",isLoggedIn,(req,res)=>{
    let msg=req.flash("success");
    res.render("createproduct",{msg});
});


module.exports=router;