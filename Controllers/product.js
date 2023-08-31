const { Product } = require("../Models/Product.models");

// Controller to create a new product
async function createProduct(req, res) {
  try {
    const { title, price, description, category } = req.body;
    const product = await Product.create({
      title,
      price,
      description,
      category,
    });
    return res.status(201).json(product);
  } catch (error) {
    return res.status(500).json({ error: "Failed to create product" });
  }
}

// Controller to get all products or products by category
async function getProducts(req, res) {
  try {
    const { categoryId } = req.params;
    const whereCondition = categoryId ? { category: categoryId } : {};
    const products = await Product.findAll({
      where: whereCondition,
    });
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ error: "Failed to retrieve products" });
  }
}

// Controller to update a product
async function updateProduct(req, res) {
  try {
    const { productId } = req.params;
    const { title, price, description, category } = req.body;
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    product.title = title;
    product.price = price;
    product.description = description;
    product.category = category;
    await product.save();
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ error: "Failed to update product" });
  }
}

// Controller to delete a product
async function deleteProduct(req, res) {
  try {
    const { productId } = req.params;
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    await product.destroy();
    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ error: "Failed to delete product" });
  }
}

module.exports = {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
};
