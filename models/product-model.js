const mongoose=require('mongoose');
const productSchema=mongoose.Schema({
    productName:String,
    image:Buffer,
    price:Number,
    discount:Number,
    bgColor:String,
    panelColor:String,
    textColor:String
});
module.exports=mongoose.model("product",productSchema);