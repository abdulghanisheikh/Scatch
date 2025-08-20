const productModel=require('../models/product-model.js');

const addProduct=async(req,res)=>{
    try{
        const {productName,productPrice,productDiscount,panelBgColor,panelColor,panelTextColor}=req.body;
        let addedProduct=await productModel.create({
            productName,
            price:productPrice,
            discount:productDiscount,
            image:req.file.buffer,
            bgColor:panelBgColor,
            panelColor,
            textColor:panelTextColor
        });
        req.flash("success","product listed successfully");
        res.status(200).redirect("/owner/admin");
    }
    catch(err){
        res.status(500).send(err.message);
    }
}

module.exports={addProduct};