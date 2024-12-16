const express=require("express")
const app=express()
const path=require("path")
const tsx=require("tsx")
const collection=require("./mongodb")

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

const data={
    name:req.body.name,
    password:req.body.password,
}

await collection.insertMany({data})

res.req('/')

})

app.listen(3000,()=>{
    console.log("port connected");
})