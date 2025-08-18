const express=require('express');
const app=express();
const cookieParser=require('cookie-parser');
const path=require('path');
const db=require('./config/db-connection.js');
const ownerRoutes=require('./routes/owner-routes.js');
const userRoutes=require('./routes/user-routes.js');
const productRoutes=require('./routes/product-routes.js');
const mainPageRoute=require('./routes/index.js');
const expressSession=require('express-session');
const flash=require('connect-flash');
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(expressSession({
    resave:false,
    saveUninitialized:false,
    secret:process.env.SESSION_SECRET
}));
app.use(flash());
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname,'public')));


app.use("/owner",ownerRoutes);
app.use("/user",userRoutes);
app.use("/product",productRoutes);
app.use("/",mainPageRoute);

app.listen(process.env.PORT,()=>{
    console.log("server running");
});