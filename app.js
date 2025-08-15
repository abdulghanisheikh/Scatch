const express=require('express');
const app=express();
const cookieParser=require('cookie-parser');
const path=require('path');
const db=require('./config/db-connection.js');
const ownerRoutes=require('./routes/ownerRoutes.js');
const userRoutes=require('./routes/userRoutes.js');
const productRoutes=require('./routes/productRoutes.js');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'public')));
app.set('view engine','ejs');

app.use("/owner",ownerRoutes);
app.use("/user",userRoutes);
app.use("/product",productRoutes);

app.get("/",(req,res)=>{
    res.send("<h1>Home</h1>")
});

app.listen(3000,()=>{
    console.log("server running on port number 3000");
});