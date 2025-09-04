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
        let user=req.user;
        res.render("shop",{products,error,msg,sortby,user});
    }
    catch(err){
        res.status(500).send(err);
    }
});

router.get("/cart",isLoggedIn,async(req,res)=>{
    try{
        let user=await userModel.findOne({email:req.user.email}).populate("cart");
        let error=req.flash("error");
        let msg=req.flash("removed");
        res.render("cart",{user,products:user.cart,error,msg});
    }
    catch(err){
        res.status(500).send(err);
    }
});

router.get("/addToCart/:productId",isLoggedIn,async(req,res)=>{
    try{
        let user=req.user;
        user.cart.push(req.params.productId);
        let product=await productModel.findOne({_id:req.params.productId});
        product.addedToCart=true;
        await product.save();
        await user.save();
        req.flash("success","Added to cart");
        res.redirect("/shop");
    }
    catch(err){
        res.status(500).send(err);
    }
});

router.get("/removeFromCart/:productId",isLoggedIn,async(req,res)=>{
    try{
        let user=req.user;
        user.cart=user.cart.filter((id)=>{
            return id.toString()!==req.params.productId;
        });
        let product=await productModel.findOne({_id:req.params.productId});
        product.addedToCart=false;
        await product.save();
        await user.save();
        req.flash("removed","Removed from cart");
        res.redirect("/cart");
    }
    catch(err){
        res.status(500).send(err);
    }
});

router.get("/shop/discounted",async(req,res)=>{
    try{
        let products=await productModel.find();
        products=products.filter((product)=>{
            return product.discount>0;
        });
        const {sortby}=req.query;
        res.render("discountedproducts",{products,sortby});
    }
    catch(err){
        res.status(500).send(err);
    }
});

module.exports=router;