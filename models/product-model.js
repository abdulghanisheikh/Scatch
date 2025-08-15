const mongoose=require('mongoose');
const productSchema=mongoose.Schema({
    productName:{
        type:String,
        require:true,
        unique:true
    },
    image:String,
    price:{
        type:Number,
        required:true
    },
    discount:String,
    bgColor:String,
    panelColor:String,
    textColor:String
});
module.exports=mongoose.model("product",productSchema);