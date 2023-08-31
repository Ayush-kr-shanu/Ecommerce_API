const express=require("express")
const UserController = require("../Controllers/User")


const routes=express.Router()

//All user routes
routes.post("/register", UserController.register)
routes.post("/login", UserController.login)










module.exports={routes}