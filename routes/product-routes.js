const express=require('express');
const router=express.Router();
const upload=require('../config/multer-config.js');
const {addProduct}=require('../controller/product-controllers.js');

router.post("/create",upload.single("imageFile"),addProduct);

module.exports=router;