const { Category } = require("../Models/Category.model");
const { Product } = require("../Models/Product.models")

const productController = {
  // Controller to create a new product
async createProduct(req, res) {
  try {
    const { title, price, description, categoryId } = req.body;
    if(!title || !price || !description || !categoryId){
      return res.status(401).json({ msg: "All details are mandatory" })
    }
    const product = await Product.create({
      title,
      price,
      description,
      categoryId,
    });
    return res.status(201).json(product);
  } catch (error) {
    return res.status(500).json({ error: "Failed to create product", err:error.message});
  }
},

// Controller to get all products or products by category
async getProducts(req, res) {
  try {
    const products = await Product.findAll({
      include:[
        {
          model:Category,
          attributes:["name"]
        }
      ]
    });
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ error: "Failed to retrieve products", err:error.message });
  }
},

// Get product by Id
async getProductsById(req, res) {
  try {
    const { productId } = req.params
    const products = await Product.findAll({
      where:productId,
      include:[
        {
          model:Category,
          attributes:["name"]
        }
      ]
    });
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ error: "Failed to retrieve products", err:error.message });
  }
},

// Controller to update a product
async updateProduct(req, res) {
  try {
    const { productId } = req.params;
    const { title, price, description, categoryId } = req.body;
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    product.title = title;
    product.price = price;
    product.description = description;
    product.categoryId = categoryId;
    await product.save();
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ error: "Failed to update product", err:error.message });
  }
},

// Controller to delete a product
async deleteProduct(req, res) {
  try {
    const { productId } = req.params;
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    await product.destroy();
    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ error: "Failed to delete product", err:error.message });
  }
}
}

module.exports = {
  productController
};
