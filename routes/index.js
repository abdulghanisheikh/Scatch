const express=require('express');
const isLoggedIn = require('../middlewares/isLoggedIn');
const router=express.Router();
const productModel=require('../models/product-model.js');
const userModel=require('../models/user-model.js');

router.get("/",(req,res)=>{
    let error=req.flash("error");
    let msg=req.flash("success");
    res.render("index",{error,msg});
});

router.get("/shop",isLoggedIn,async(req,res)=>{
    try{
        let products=await productModel.find();
        let msg=req.flash("success");
        let error=req.flash("error");
        const {sortby}=req.query;
        if(sortby==="newest"){
            products.reverse();
        }
        res.render("shop",{products,error,msg,sortby});
    }
    catch(err){
        console.log(err);
    }
});

router.get("/cart",isLoggedIn,async(req,res)=>{
    let user=await userModel.findOne({email:req.user.email}).populate("cart");
    let error=req.flash("error");
    res.render("cart",{products:user.cart,error});
});

router.get("/addToCart/:productId",isLoggedIn,async(req,res)=>{
    let user=req.user;
    user.cart.push(req.params.productId);
    await user.save();
    req.flash("success","Added to cart");
    res.redirect("/shop");
});

module.exports=router;