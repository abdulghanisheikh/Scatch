const userModel=require('../models/user-model.js');
const bcrypt=require('bcrypt');
const generateToken=require('../config/generate-token.js');

const registerUser=async(req,res)=>{
    try{
        const {fullName,email,password}=req.body;
        if(fullName===""||email===""||password==="") return res.status(503).send("fill all the entries");
        let user=await userModel.findOne({email});
        if(user) return res.status(400).send("You already have an account, please login");
        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(password,salt,async(err,hash)=>{
                if(err) return res.status(503).send(err.message);
                let createdUser=await userModel.create({
                    fullName,
                    email,
                    password:hash
                });
                res.status(200).send("User created");
            });
        });
    }
    catch(err){
        res.send(err.message);
    }
}

const loginUser=async(req,res)=>{
    try{
        const {email,password}=req.body;
        let user=await userModel.findOne({email});
        if(!user){
            req.flash("error","User does not exists");
            return res.redirect("/");
        }
        bcrypt.compare(password,user.password,async(err,result)=>{
            if(err) return res.send(err.message);
            if(result){
                let token=generateToken(user);
                res.cookie("token",token);
                res.status(200).redirect("/shop");
            }
            else{
                req.flash("error","email or password incorrect");
                res.redirect("/");
            }
        })
    }
    catch(err){
        res.send(err.message);
    }
}

const logoutUser=(req,res)=>{
    res.cookie("token","");
    res.redirect("/");
}

module.exports={registerUser,loginUser,logoutUser};