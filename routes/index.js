const express=require('express');
const isLoggedIn = require('../middlewares/isLoggedIn');
const router=express.Router();
const productModel=require('../models/product-model.js');
const userModel=require('../models/user-model.js');

router.get("/",(req,res)=>{
    let error=req.flash("error");
    res.render("index",{error});
});

router.get("/shop",isLoggedIn,async(req,res)=>{
    let products=await productModel.find();
    let msg=req.flash("success");
    res.render("shop",{products,msg});
});

router.get("/cart",isLoggedIn,async(req,res)=>{
    let user=await userModel.findOne({email:req.user.email}).populate("cart");
    res.render("cart",{products:user.cart});
});

router.get("/addToCart/:productId",isLoggedIn,async(req,res)=>{
    let user=req.user
    user.cart.push(req.params.productId);
    await user.save();
    req.flash("success","Added to cart");
    res.redirect("/shop");
});

module.exports=router;