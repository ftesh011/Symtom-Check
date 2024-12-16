const mongoose=require("mongoose")

mongoose.connect("mongodb://localhost:27017/SignUpLoginSection")
.then(()=>{
    console.log("mongodb connection positive");
})
.catch(()=>{
    console.log("Connection failed");
})

const LoginSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})


const collection=new mongoose.model("Collection1",LoginSchema)

module.exports=collection