const express=require('express');
const router=express.Router();
const {registerUser,loginUser,logoutUser}=require('../controller/auth-controllers.js');

router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/logout",logoutUser);
router.get("/admin",(req,res)=>{
    let msg=req.flash("success")
    res.render("createproduct",{msg});
});

module.exports=router;