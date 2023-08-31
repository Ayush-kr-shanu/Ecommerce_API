const express=require("express")
const { seq } = require("./Config/db")
const { routes } = require("./Routes/routes")


const app=express()

app.use(express.json())

app.get("/", (req, res)=>{
    res.status(200).send("Welcome to backend")
})

app.use(routes)


seq.sync().then(()=>{
    app.listen(3001, ()=>{
        console.log("Server started");
    })
})
