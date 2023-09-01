# Ecommerce API with Node.js

This is an API for an e-commerce platform built using Node.js and various libraries and frameworks. It provides endpoints for product and category management, user authentication, cart management, and order processing.

## Getting Started

Follow these steps to set up and run the project:

### Prerequisites

Make sure you have Node.js and npm installed on your machine.

### Installation
1. Clone the repository to your local machine:

   ```bash
   git clone <https://github.com/Ayush-kr-shanu/Ecommerce_API>
   cd Ecommerce_API
   ```
2. Install the project dependencies: ```npm install```

### Environment Variables

```DATABASE=leading-tech``` <br>
```USER=root``` <br>
```PASS=your_password``` <br>
```HOST=localhost``` <br>
```DILACT=mysql``` <br>

```JWT_CODE=your_secret_jwt_code``` <br>

Replace `your_password` and `your_secret_jwt_code` with your actual database password and JWT secret code.

### Running the Server

Run the server using the following command: ```npm run server```

The API will start running on port 3001.

## Endpoints

### User Routes

Register a new user: ```POST /register``` <br>

Log in as a user: ```POST /login``` <br>

### Category Routes

Get a list of categories: ```GET /category``` <br>

Create a new category: ```POST /category``` <br>

Update a category by ID: ```PUT /category/:categoryId``` <br>

Delete a category by ID: ```DELETE /category/:categoryId``` <br>

### Product Routes

Get a list of products: ```GET /product``` <br>

Get a product by ID: ```GET /product/:productId``` <br>

Create a new product: ```POST /product``` <br>

Update a product by ID: ```PUT /product/:productId``` <br>

Delete a product by ID: ```DELETE /product/:productId``` <br>

### Cart Routes

View the user's cart: ```GET /cart``` <br>

Add a product to the user's cart: ```POST /cart``` <br>

Update a cart item by ID: PUT /cart/: ```cartItemId``` <br>

Remove a cart item by ID: ```DELETE /cart/:cartItemId``` <br>

### Order Routes

Get the user's order history: ```GET /order``` <br>

Place a new order with products from the user's cart: ```POST /order``` <br>

Get order details by ID: ```GET /order/:orderId``` <br>


