const mongoose=require('mongoose');
const dbgr=require('debug')('development:mongoose');
require('dotenv').config();

mongoose
.connect(process.env.MONGO_URI)
.then(()=>{
    dbgr("database connected");
})
.catch((err)=>{
    dbgr(err);
});
module.exports=mongoose.connection;