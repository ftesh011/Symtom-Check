const express=require("express")
const app=express()
const path=require("path")
const tsx=require("tsx")
const collection=require("./mongodb")
const bcrypt=require("bcrypt")

const appPath=path.join(__dirname,'../app')

app.use(express.json())
app.set("view engine","tsx")
app.set("views",appPath)
app.use(express.urlencoded({extended:false}))


app.get("/SignUp",(req,res)=>{
    res.render("SignUp")
})

app.get("/Login",(req,res)=>{
    res.render("Login")
})


app.post("/SignUp",async (req,res)=>{

    try{

    //User handle formatting and validation to be stored in database and to check if user exists already 
    const existingUser=await collection.findOne({name:req.body.name})
    if(existingUser){
        return res.status(400).json({error :"This user already exists"})
    }

    //Hash password to be converted to a string in the database for security measures
    const hashedPassword=await bcrypt.hash(req.body.password,15)

    //Create new user
    const data={
        name:req.body.name,
        password:hashedPassword
    }

    //User storage and validation of creation
    await collection.create(data)
    res.status(201).json({message:"User created successfully"})
  } catch (error) {
    console.error("SIGN UP ERROR:", error)
    res.status(500).json({error:"USER CREATION ERROR"})
  }
})


app.post("/Login",async (req,res)=>{
    try {
    
    //Search for the user to prove the user exists     
    const user=await collection.findOne({name:req.body.name})
    if(!user){
        return res.status(400).json({message:"User does not exist"})
    }

    // Password Verification
    const isPasswordValid=await bcrypt.compare(req.body.password,user.password)
    if(!isPasswordValid){
        return res.status(400).json({message:"Invalid password"})
    }

    res.status(200).json({message:"Login successful"})
  } catch (error) {
    console.error("LOGIN ERROR:", error)
    res.status(500).json({error:"LOGIN ERROR"})
  }
    
    
})

app.listen(3000,()=>{
    console.log("port connected");
})
