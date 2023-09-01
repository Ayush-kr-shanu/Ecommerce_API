const express=require("express")
const UserController = require("../Controllers/User")
const { categoryController } = require("../Controllers/category")
const { productController } = require("../Controllers/product")
const cartController = require("../Controllers/cart")
const { authenticate } = require("../Middleware/auth")
const orderController = require("../Controllers/order")

const routes=express.Router()

//All user routes
routes.post("/register", UserController.register)
routes.post("/login", UserController.login)


//category routes
routes.get("/category", categoryController.getCategories)
routes.post("/category", categoryController.createCategory)
routes.put("/category/:categoryId", categoryController.updateCategory)
routes.delete("/category/:categoryId", categoryController.deleteCategory)


//Product routes
routes.get("/product", productController.getProducts)
routes.get("/product/:productId", productController.getProductsById)

//Authentication middleware
routes.use(authenticate)

routes.post("/product", productController.createProduct)
routes.put("/product/:productId", productController.updateProduct)
routes.delete("/product/:productId", productController.deleteProduct)

//Cart routes
routes.get("/cart", cartController.viewCart)
routes.post("/cart", cartController.addToCart)
routes.put("/cart/:cartItemId", cartController.updateCartItem)
routes.delete("/cart/:cartItemId", cartController.removeCartItem)


//Orders routes
routes.get("/order", orderController.getOrderHistory)
routes.post("/order", orderController.placeOrder)
routes.get("/order/:orderId", orderController.getOrderDetails)




module.exports={routes}