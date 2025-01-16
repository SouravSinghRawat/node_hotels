const mongoose=require("mongoose");
// const mongoUrl="mongodb://127.0.0.1:27017/hulla";

const mongoUrl=process.env.DB_URL;

mongoose.connect(mongoUrl,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
const db=mongoose.connection;
db.on('connected',()=>{
    console.log("mongodb connected");
})
db.on('error',(err)=>{
    console.log("Error:",err);
})
db.on("disconnected", () => {
    console.log("Disconnected");
});
module.exports=db;

//comment added for testing purpose
//MfTqzEBe5xmk1CTq