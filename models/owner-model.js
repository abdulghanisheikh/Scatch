const mongoose=require('mongoose');
const ownerSchema=mongoose.Schema({
    fullName:{
        type:String,
        trim:true,
        minLength:3
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        unique:true,
        required:true
    },
    products:{
        type:Array,
        default:[]
    },
    picture:String,
    gstNo:Number
});
module.exports=mongoose.model("owner",ownerSchema);